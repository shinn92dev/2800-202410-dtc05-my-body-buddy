"use client";

import React, { useEffect, useState } from "react";
import TopCalendar from "@/components/top_calendar/TopCalendar";
import ScoreCircleBarWrapper from "@/components/summary_score_circle_bar/ScoreCircleBarWrapper";
import BarGraph from "@/components/global/BarGraph";
import WorkoutDietLink from "@/components/workout_diet_link/WorkoutDietLink";
import AverageCalorieBanner from "@/components/global/AverageCalorieBanner";
import axios from "axios";
import { handleDateSelect } from "@/app/_helper/handleDate"; 

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
    const [errorStatus, setErrorStatus] = useState<number | null>(null); 
    const [weeklyMeals, setWeeklyMeals] = useState<MealsData[]>([]);
    const [weekRange, setWeekRange] = useState<string>("");

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
                        setErrorStatus(error.response ? error.response.status : 500);
                    }
                }
            };
            fetchMeals();
        }
    }, [userId, date]);

    useEffect(() => {
        if (userId) {
            const fetchWeeklyMeals = async () => {
                const dates = getWeekDates(new Date(date));
                const mealPromises = dates.map(async date => {
                    try {
                        const response = await axios.get(`/api/get-meals`, { 
                            params: {userId, date} 
                        });
                        if (response.data) {
                            console.log(`Meals for date ${date}:`, response.data);
                            return response.data;
                        } else {
                            console.log(`No meals found for date: ${date}`);
                            return null;
                        }
                    } catch (error: any) {
                        if (error.response && error.response.status === 404) {
                            console.log(`No meals found for date: ${date}`);
                            return null;
                        } else {
                            console.error(`Error fetching meals for date ${date}:`, error);
                            return null;
                        }
                    }
                });

                try {
                    const mealsData = await Promise.all(mealPromises);
                    const validMeals = mealsData.filter(data => data !== null);
                    setWeeklyMeals(validMeals);
                    setWeekRange(`${dates[0]} to ${dates[6]}`);
                    console.log("Weekly Meals:", validMeals);
                } catch (error) {
                    console.error("Error fetching weekly meals:", error);
                }
            };
            fetchWeeklyMeals();
        }
    }, [userId, date]);

    const getWeekDates = (currentDate: Date) => {
        const weekDates = [];
        const dayOfWeek = currentDate.getUTCDay();
        const sunday = new Date(currentDate);
        sunday.setUTCDate(currentDate.getUTCDate() - dayOfWeek);
        for (let i = 0; i < 7; i++) {
            const date = new Date(sunday);
            date.setUTCDate(sunday.getUTCDate() + i);
            weekDates.push(date.toISOString().split('T')[0]);
        }
        return weekDates;
    };

    const calculateAverageCalories = (mealType: keyof MealsData) => {
        if (!weeklyMeals.length) return 0;
        const totalCalories = weeklyMeals.reduce((total, day) => {
            return total + (day[mealType] ? (day[mealType] as MealType[]).reduce((mealTotal, item) => mealTotal + item.calories, 0) : 0);
        }, 0);
        console.log(`Total ${mealType} calories for the week:`, totalCalories);
        return totalCalories / weeklyMeals.length;
    };

    const averageDailyCalories = calculateAverageCalories("breakfast") + calculateAverageCalories("lunch") + calculateAverageCalories("dinner") + calculateAverageCalories("snacks");
    const averageBreakfastCalories = calculateAverageCalories("breakfast");
    const averageLunchCalories = calculateAverageCalories("lunch");
    const averageDinnerCalories = calculateAverageCalories("dinner");
    const averageSnackCalories = calculateAverageCalories("snacks");
    const maxCalories = 5000;

    return (
        <div>
            <TopCalendar onDateSelect={(date) => handleDateSelect(date, setDate)} />
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
                <AverageCalorieBanner
                    title="Average Calories intake from"
                    range={weekRange}
                />
                <BarGraph
                    label="Average daily"
                    value={averageDailyCalories}
                    maxValue={maxCalories}
                />
                <BarGraph
                    label="Average Breakfast"
                    value={averageBreakfastCalories}
                    maxValue={maxCalories}
                />
                <BarGraph
                    label="Average lunch"
                    value={averageLunchCalories}
                    maxValue={maxCalories}
                />
                <BarGraph
                    label="Average dinner"
                    value={averageDinnerCalories}
                    maxValue={maxCalories}
                />
                <BarGraph
                    label="Average snacks"
                    value={averageSnackCalories}
                    maxValue={maxCalories}
                />
            </div>
        </div>
    );
}
