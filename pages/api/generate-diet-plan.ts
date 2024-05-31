import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import { getAuth } from "@clerk/nextjs/server";
import { connectMongoDB } from "@/config/db";
import Target from "@/models/Target";
import Meal from '@/models/Meal';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const fetchTargetCaloriesIntake = async (req: NextApiRequest): Promise<number> => {
    const { userId } = getAuth(req);
    await connectMongoDB();
    const target = await Target.findOne({ userId });
    const { targetCaloriesIntake } = target;
    return Math.round(targetCaloriesIntake);
}

const fetchRemainingCaloriesForToday = async (req: NextApiRequest, targetCaloriesIntake: number): Promise<number> => {
    const { userId } = getAuth(req);
    await connectMongoDB();
    const meals = await Meal.findOne({ userId, 'dailyMeals.date': new Date().toISOString().split('T')[0] });
    if (!meals) {
        return targetCaloriesIntake;
    }
    const dailyMeal = meals.dailyMeals.find((meal: { date: { toISOString: () => string; }; }) => meal.date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0]);
    if (!dailyMeal) {
        return targetCaloriesIntake;
    }
    const totalCalories = ['breakfast', 'lunch', 'dinner', 'snacks'].reduce((acc, mealType) => {
        return acc + dailyMeal[mealType].reduce((mealAcc: any, item: { calories: any; }) => mealAcc + item.calories, 0);
    }, 0);
    return Math.round(targetCaloriesIntake - totalCalories);
}

// data to fetch from db
// const remainingCalorieForToday = 700;
// const totalTargetCalories = 2000;

const generateDietPlan = async (prompt: string) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: 'user', content: prompt }],
        });
        return response.choices?.[0]?.message?.content?.trim() ?? 'No response from AI';
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        throw new Error('OpenAI API request failed');
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { servings, ingredients, preferences } = req.body;

        if (!servings || !ingredients || !preferences) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        const totalTargetCalories = await fetchTargetCaloriesIntake(req);
        const remainingCalorieForToday = await fetchRemainingCaloriesForToday(req, totalTargetCalories);

        const prompt = `Please consider a meal plan for ${servings} servings, taking into account the preferences provided.\n\nPreferences: ${preferences.join(', ')}\n\nThe meal plan must include the following ingredients: ${ingredients.map((ing: any) => `${ing.name} (${ing.quantity ?? 'as needed'})`).join(', ')}.\n\nThe total calories of the generated meal plan must also match ${servings === '1' ? remainingCalorieForToday : totalTargetCalories * servings}.\n\nFor each menu item, please include the necessary ingredients and quantities, the recipe (detailed steps), and the calories.`;

        try {
            const result = await generateDietPlan(prompt);
            res.status(200).json({ result });
        } catch (error) {
            res.status(500).json({ error: 'Failed to generate diet plan' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
