"use client";

import React, { useEffect, useState, useMemo } from "react";
import TopCalendar from "@/components/global/TopCalendar";
import BarGraph from "@/components/global/BarGraph";
import WorkoutDietLink from "@/components/workout_diet_link/WorkoutDietLink";
import AverageCalorieBanner from "@/components/global/AverageCalorieBanner";
import axios from "axios";
import { handleDateSelect } from "@/app/_helper/handleDate";
import LoadingAnimation from "../global/LoadingAnimation";

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

export default function DietSummaryWrapper() {
    const [meals, setMeals] = useState<MealsData | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [date, setDate] = useState<string>(
        new Date().toISOString().split("T")[0]
    );
    const [errorStatus, setErrorStatus] = useState<number | null>(null);
    const [weeklyMeals, setWeeklyMeals] = useState<MealsData[]>([]);
    const [weekRange, setWeekRange] = useState<string>("");
    const [targetCalories, setTargetCalories] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
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
                setLoading(true);
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
                        setErrorStatus(
                            error.response ? error.response.status : 500
                        );
                    }
                }
                setLoading(false);
            };
            fetchMeals();
        }
    }, [userId, date]);

    useEffect(() => {
        const fetchTargetCalories = async () => {
            try {
                const response = await axios.get("/api/targets");
                setTargetCalories(response.data.targetCaloriesIntake);
                console.log(
                    "Target Calories:",
                    response.data.targetCaloriesIntake
                );
            } catch (error) {
                console.error("Error fetching target calories:", error);
            }
        };
        fetchTargetCalories();
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchWeeklyMeals = async () => {
                const dates = getWeekDates(new Date(date));
                const mealPromises = dates.map(async (date) => {
                    try {
                        const response = await axios.get(`/api/get-meals`, {
                            params: { userId, date },
                        });
                        if (response.data) {
                            console.log(
                                `Meals for date ${date}:`,
                                response.data
                            );
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
                            console.error(
                                `Error fetching meals for date ${date}:`,
                                error
                            );
                            return null;
                        }
                    }
                });

                try {
                    const mealsData = await Promise.all(mealPromises);
                    const validMeals = mealsData.filter(
                        (data) => data !== null
                    );
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
        const dayOfWeek = (currentDate.getUTCDay() + 6) % 7;
        const monday = new Date(currentDate);
        monday.setUTCDate(currentDate.getUTCDate() - dayOfWeek);
        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setUTCDate(monday.getUTCDate() + i);
            weekDates.push(date.toISOString().split("T")[0]);
        }
        return weekDates;
    };

    const calculateAverageCalories = useMemo(() => {
        const calculate = (mealType: keyof MealsData) => {
            if (!weeklyMeals.length) return 0;

            const daysWithData = weeklyMeals.filter(
                (day) =>
                    day[mealType] && (day[mealType] as MealType[]).length > 0
            ).length;

            if (daysWithData === 0) return 0;

            const totalCalories = weeklyMeals.reduce((total, day, index) => {
                const dayCalories = day[mealType]
                    ? (day[mealType] as MealType[]).reduce(
                          (mealTotal, item) => {
                              return mealTotal + item.calories;
                          },
                          0
                      )
                    : 0;

                return total + dayCalories;
            }, 0);

            const averageCalories = totalCalories / daysWithData;

            return Math.round(averageCalories);
        };

        return calculate;
    }, [weeklyMeals]);

    const calculateTotalDailyCalories = useMemo(() => {
        const calculate = () => {
            const totalDailyCalories = weeklyMeals.reduce(
                (total, day, index) => {
                    const dayCalories =
                        (day.breakfast || []).reduce(
                            (mealTotal, item) => mealTotal + item.calories,
                            0
                        ) +
                        (day.lunch || []).reduce(
                            (mealTotal, item) => mealTotal + item.calories,
                            0
                        ) +
                        (day.dinner || []).reduce(
                            (mealTotal, item) => mealTotal + item.calories,
                            0
                        ) +
                        (day.snacks || []).reduce(
                            (mealTotal, item) => mealTotal + item.calories,
                            0
                        );

                    return total + dayCalories;
                },
                0
            );

            const daysWithData = weeklyMeals.filter(
                (day) =>
                    (day.breakfast && day.breakfast.length > 0) ||
                    (day.lunch && day.lunch.length > 0) ||
                    (day.dinner && day.dinner.length > 0) ||
                    (day.snacks && day.snacks.length > 0)
            ).length;

            if (daysWithData === 0) return 0;

            const averageDailyCalories = totalDailyCalories / daysWithData;

            return Math.round(averageDailyCalories);
        };

        return calculate;
    }, [weeklyMeals]);

    const averageDailyCalories = calculateTotalDailyCalories();
    const averageBreakfastCalories = calculateAverageCalories("breakfast");
    const averageLunchCalories = calculateAverageCalories("lunch");
    const averageDinnerCalories = calculateAverageCalories("dinner");
    const averageSnackCalories = calculateAverageCalories("snacks");
    const dailyMaxCalories = Math.round(targetCalories * 1.2);
    const breakfastMaxCalories = Math.round(dailyMaxCalories * 0.3);
    const lunchMaxCalories = Math.round(dailyMaxCalories * 0.3);
    const dinnerMaxCalories = Math.round(dailyMaxCalories * 0.3);
    const snackMaxCalories = Math.round(dailyMaxCalories * 0.1);

    const dailyTargetCalories = Math.round(dailyMaxCalories * 0.83);
    const breakfastTargetCalories = Math.round(breakfastMaxCalories * 0.83);
    const lunchTargetCalories = Math.round(lunchMaxCalories * 0.83);
    const dinnerTargetCalories = Math.round(dinnerMaxCalories * 0.83);
    const snackTargetCalories = Math.round(snackMaxCalories * 0.83);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingAnimation />
            </div>
        );
    }

    if (errorStatus) {
        return (
            <div>Error: Unable to fetch data. Status code: {errorStatus}</div>
        );
    }

    return (
        <div>
            <TopCalendar
                onDateSelect={(date) => handleDateSelect(date, setDate)}
            />
            <WorkoutDietLink
                workoutLink="/summary/workout"
                dietLink="/summary/diet"
                workoutText="Workout"
                dietText="Diet"
                workoutTextColor="text-gray-300"
                dietTextColor="text-black"
                workoutUnderline="underline decoration-gray-300"
                dietUnderline="underline decoration-black"
            />
            <div className="text-center">
                <AverageCalorieBanner
                    title="Average Calories intake from"
                    range={weekRange}
                />
                <BarGraph
                    label="Daily Average"
                    value={averageDailyCalories}
                    maxValue={dailyMaxCalories}
                    targetValue={dailyTargetCalories}
                />
                <BarGraph
                    label="Breakfast Average"
                    value={averageBreakfastCalories}
                    maxValue={breakfastMaxCalories}
                    targetValue={breakfastTargetCalories}
                />
                <BarGraph
                    label="Lunch Average"
                    value={averageLunchCalories}
                    maxValue={lunchMaxCalories}
                    targetValue={lunchTargetCalories}
                />
                <BarGraph
                    label="Dinner Average"
                    value={averageDinnerCalories}
                    maxValue={dinnerMaxCalories}
                    targetValue={dinnerTargetCalories}
                />
                <BarGraph
                    label="Snacks Average"
                    value={averageSnackCalories}
                    maxValue={snackMaxCalories}
                    targetValue={snackTargetCalories}
                />
            </div>
        </div>
    );
}
