import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";
import { getAuth } from "@clerk/nextjs/server";
import { connectMongoDB } from "@/config/db";
import Target from "@/models/Target";
import Profile from "@/models/Profile";
import { calculateBmr, calculateCaloriesPerDay, calculateEnergyRequirementsPerDay, factorByActivityLevel } from "@/app/_helper/calorie";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const fetchTargetCaloriesBurn = async (req: NextApiRequest): Promise<number> => {
    const { userId } = getAuth(req);
    await connectMongoDB();
    const profile = await Profile.findOne({ userId });
    if (!profile) {
        throw new Error("Profile not found");
    }
    const { age, gender, height, weight, activityLevel } = profile;
    const target = await Target.findOne({ userId });
    if (!target) {
        throw new Error("Target not found");
    }
    const { targetCaloriesBurn } = target;
    const bmr = calculateBmr(age, height, weight, gender);
    const activityFactor = factorByActivityLevel(age, activityLevel);
    const energyRequirements = calculateEnergyRequirementsPerDay(bmr, activityFactor);

    if (targetCaloriesBurn < energyRequirements) {
        return 0;
    } else {
        return Math.round(targetCaloriesBurn - energyRequirements);
    }
};

// data to fetch from db
// const targetCaloriesForWorkoutPerDay = await fetchTargetCaloriesBurn();

const generateWorkoutPlan = async (prompt: string) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
        });
        return (
            response.choices?.[0]?.message?.content?.trim() ??
            "No response from AI"
        );
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        throw new Error("OpenAI API request failed");
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const targetCaloriesForWorkoutPerDay = await fetchTargetCaloriesBurn(req);
        const prompt = `
        Please consider workout menus for seven days. Each menu should include at least one (commonly two or more) workout item(s), and the total estimated calorie consumption of these items must be ${targetCaloriesForWorkoutPerDay} kcal.\n\n
        
        The output must follow this format:\n
        Day 1:\n
        ・[item_name] - [quantity] [unit(min, reps, etc.)] ([estimated_calorie_consume] kcal)\n
        ・[item_name] - [quantity] [unit(min, reps, etc.)] ([estimated_calorie_consume] kcal)\n\n
        
        Day 2:\n
        ・[item_name] - [quantity] [unit(min, reps, etc.)] ([estimated_calorie_consume] kcal)\n
        ・[item_name] - [quantity] [unit(min, reps, etc.)] ([estimated_calorie_consume] kcal)\n
        (repeat for subsequent days)`;

        try {
            const result = await generateWorkoutPlan(prompt);
            res.status(200).json({ result });
        } catch (error) {
            res.status(500).json({ error: "Failed to generate workout plan" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
