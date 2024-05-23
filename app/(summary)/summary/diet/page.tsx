"use client";

import React, { useEffect, useState } from "react";
import TopCalendar from "@/components/top_calendar/TopCalendar";
import ScoreCircleBarWrapper from "@/components/summary_score_circle_bar/ScoreCircleBarWrapper";
import BarGraph from "@/components/global/BarGraph";
import WorkoutDietLink from "@/components/workout_diet_link/WorkoutDietLink";
import axios from 'axios';

type MealType = {
    name: string;
    amount: string;
    calories: number;
}

type MealsData = {
    userId: string;
    date: string;
    breakfast: MealType[];
    lunch: MealType[];
    dinner: MealType[];
    snacks: MealType[];
}

export default function DietSummary() {
    const [meals, setMeals] = useState<{ [key: string]: any } | null>(null);
    const userId = "664719634ee345ddb6962d13"; // Replace with actual user ID
    const date = "2024-05-23"; // Replace with actual date

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await axios.get(`/api/get-meals`, {
                    params: { userId, date }
                });
                setMeals(response.data);
            } catch (error) {
                console.error("Error fetching meals:", error);
            }
        };

        fetchMeals();
    }, [userId, date]);

    const calculateCalories = (mealType: keyof MealsData["breakfast" | "lunch" | "dinner" | "snacks"]) => {
        if (!meals || !meals[mealType]) return 0;
        return meals[mealType].reduce((total: number, item: {calories: number}) => total + item.calories, 0);
    };

    const dailyTotalCalories = calculateCalories("breakfast") + calculateCalories("lunch") + calculateCalories("dinner") + calculateCalories("snacks");
    const breakfastTotalCalories = calculateCalories("breakfast");
    const lunchTotalCalories = calculateCalories("lunch");
    const dinnerTotalCalories = calculateCalories("dinner");
    const snackTotalCalories = calculateCalories("snacks");
    const maxCalories = 3500;

    return (
        <div>
            <TopCalendar/>
            <WorkoutDietLink
                workoutLink="/summary/workout"
                dietLink="/summary/diet"
                workoutText="Workout"
                dietText="Diet"
                workoutTextColor="text-gray-300"
                dietTextColor="text-black"
            />
            <div className="text-center">
                <ScoreCircleBarWrapper score={80} percent={80} />
                <div className='text-xl font-semibold p-4'>Calorie Took</div>
                <BarGraph label="Daily total" value={dailyTotalCalories} maxValue={maxCalories}/>
                <BarGraph label="Breakfast total" value={breakfastTotalCalories} maxValue={maxCalories}/>
                <BarGraph label="Lunch total" value={lunchTotalCalories} maxValue={maxCalories}/>
                <BarGraph label="Dinner total" value={dinnerTotalCalories} maxValue={maxCalories}/>
                <BarGraph label="Snack total" value={snackTotalCalories} maxValue={maxCalories}/>
            </div>
        </div>
    );
}

