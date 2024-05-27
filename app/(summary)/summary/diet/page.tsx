"use client";

import React, { useEffect, useState } from "react";
import TopCalendar from "@/components/top_calendar/TopCalendar";
import ScoreCircleBarWrapper from "@/components/summary_score_circle_bar/ScoreCircleBarWrapper";
import BarGraph from "@/components/global/BarGraph";
import WorkoutDietLink from "@/components/workout_diet_link/WorkoutDietLink";
import axios from "axios";

type MealType = {
    name: string;
    quantity?: number;
    unit?: string;
    calories: number;
};

type MealsData = {
    userId: string;
    date: string;
    breakfast: MealType[];
    lunch: MealType[];
    dinner: MealType[];
    snacks: MealType[];
};

export default function DietSummary() {
    const [meals, setMeals] = useState<MealsData | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [errorStatus, setErrorStatus] = useState<number | null>(null); // Track error status

    useEffect(() => {
        // Fetch user ID from the API
        const fetchUserId = async () => {
            try {
                const response = await axios.get("/api/get-user-id");
                setUserId(response.data.userId);
                console.log("User ID:", response.data.userId);
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };
        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchMeals = async () => {
                try {
                    const response = await axios.get(`/api/get-meals`, {
                        params: { userId, date },
                    });
                    if (response.data) {
                        setMeals(response.data);
                        setErrorStatus(null);
                        console.log("Meals:", response.data);
                    } else {
                        setMeals(null);
                        console.log(`No meals found for date: ${date}`);
                    }
                } catch (error: any) {
                    if (error.response && error.response.status === 404) {
                        setMeals(null);
                        console.log(`No meals found for date: ${date}`);
                    } else {
                        console.error("Error fetching meals:", error);
                        setErrorStatus(error.response ? error.status : 500);
                    }
                }
            };
            fetchMeals();
        }
    }, [userId, date]);

    const calculateCalories = (mealType: keyof MealsData) => {
        if (errorStatus === 404 || !meals || !meals[mealType]) {
            return 0;
        }
        return (meals[mealType] as MealType[]).reduce(
            (total: any, item: any) => total + item.calories,
            0
        );
    };

    const dailyTotalCalories =
        calculateCalories("breakfast") +
        calculateCalories("lunch") +
        calculateCalories("dinner") +
        calculateCalories("snacks");
    const breakfastTotalCalories = calculateCalories("breakfast");
    const lunchTotalCalories = calculateCalories("lunch");
    const dinnerTotalCalories = calculateCalories("dinner");
    const snackTotalCalories = calculateCalories("snacks");
    const maxCalories = 5000;

    const handleDateSelect = (selectedDate: Date) => {
        // Convert selected date to UTC date to avoid timezone issues
        const utcDate = new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()));
        
        // Set the date state as the selected date in the format YYYY-MM-DD
        setDate(utcDate.toISOString().split("T")[0]); 
    };

    return (
        <div>
            <TopCalendar onDateSelect={handleDateSelect} />
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
                <div className="text-xl font-semibold p-4">Calorie Took</div>
                <BarGraph
                    label="Daily total"
                    value={dailyTotalCalories}
                    maxValue={maxCalories}
                />
                <BarGraph
                    label="Breakfast total"
                    value={breakfastTotalCalories}
                    maxValue={maxCalories}
                />
                <BarGraph
                    label="Lunch total"
                    value={lunchTotalCalories}
                    maxValue={maxCalories}
                />
                <BarGraph
                    label="Dinner total"
                    value={dinnerTotalCalories}
                    maxValue={maxCalories}
                />
                <BarGraph
                    label="Snack total"
                    value={snackTotalCalories}
                    maxValue={maxCalories}
                />
            </div>
        </div>
    );
}
