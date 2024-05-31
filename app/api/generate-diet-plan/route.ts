import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { getAuth } from "@clerk/nextjs/server";
import { connectMongoDB } from "@/config/db";
import Target from "@/models/Target";
import Meal from "@/models/Meal";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const fetchTargetCaloriesIntake = async (req: NextRequest): Promise<number> => {
    const { userId } = getAuth(req);
    await connectMongoDB();
    const target = await Target.findOne({ userId });
    const { targetCaloriesIntake } = target;
    return Math.round(targetCaloriesIntake);
};

const fetchRemainingCaloriesForToday = async (
    req: NextRequest,
    targetCaloriesIntake: number
): Promise<number> => {
    const { userId } = getAuth(req);
    await connectMongoDB();
    const meals = await Meal.findOne({
        userId,
        "dailyMeals.date": new Date().toISOString().split("T")[0],
    });
    if (!meals) {
        return targetCaloriesIntake;
    }
    const dailyMeal = meals.dailyMeals.find(
        (meal: { date: { toISOString: () => string } }) =>
            meal.date.toISOString().split("T")[0] ===
            new Date().toISOString().split("T")[0]
    );
    if (!dailyMeal) {
        return targetCaloriesIntake;
    }
    const totalCalories = ["breakfast", "lunch", "dinner", "snacks"].reduce(
        (acc, mealType) => {
            return (
                acc +
                dailyMeal[mealType].reduce(
                    (mealAcc: any, item: { calories: any }) =>
                        mealAcc + item.calories,
                    0
                )
            );
        },
        0
    );
    return Math.round(targetCaloriesIntake - totalCalories);
};

const generateDietPlan = async (prompt: string) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
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

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { servings, ingredients, preferences } = body;

        if (!servings || !ingredients || !preferences) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const totalTargetCalories = await fetchTargetCaloriesIntake(req);
        const remainingCalorieForToday = await fetchRemainingCaloriesForToday(
            req,
            totalTargetCalories
        );

        const prompt = `Please consider a meal plan for ${servings} servings, taking into account the preferences provided.\n\nPreferences: ${preferences.join(
            ", "
        )}\n\nThe meal plan must include the following ingredients: ${ingredients
            .map((ing: any) => `${ing.name} (${ing.quantity ?? "as needed"})`)
            .join(
                ", "
            )}.\n\nThe total calories of the generated meal plan must also match ${
            servings === "1"
                ? remainingCalorieForToday
                : totalTargetCalories * servings
        }.\n\nFor each menu item, please include the necessary ingredients and quantities, the recipe (detailed steps), and the calories.`;

        const result = await generateDietPlan(prompt);
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to generate diet plan" },
            { status: 500 }
        );
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200 });
}
