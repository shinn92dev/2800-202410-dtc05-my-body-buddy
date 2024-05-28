// app/_helper/fetchMeals.ts

import axios from "axios";

interface Meal {
    name: string;
    quantity?: number;
    unit?: string;
    calories: number;
}

interface Meals {
    breakfast: Meal[];
    lunch: Meal[];
    dinner: Meal[];
    snacks: Meal[];
}

export const fetchMeals = async (userId: string, date: Date): Promise<Meals> => {
    try {
        const response = await axios.get("/api/get-meals", {
            params: {
                userId,
                date: date.toISOString().split("T")[0], // Ensure the date is in YYYY-MM-DD format
            },
        });

        const data = response.data;
        return {
            breakfast: data.breakfast || [],
            lunch: data.lunch || [],
            dinner: data.dinner || [],
            snacks: data.snacks || [],
        };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            // If the error is a 404, return empty arrays
            return {
                breakfast: [],
                lunch: [],
                dinner: [],
                snacks: [],
            };
        }
        console.error("Error fetching meals:", error);
        throw new Error("Failed to fetch meals");
    }
};
