"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { fetchUserId } from "@/app/_helper/fetchUserId";
import { fetchMeals } from "@/app/_helper/fetchMeals";
import { handleDateSelect } from "@/app/_helper/handleDate";
import { format } from "date-fns";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const Board = dynamic(() => import("@/components/global/Board"));
const AskAiButton = dynamic(() => import("@/components/global/AskAiButton"));
const CalorieDistributionChart = dynamic(() => import("@/components/global/CalorieDistributionChart"));
const TopCalendar = dynamic(() => import("@/components/global/TopCalendar"));

interface Meal {
    name: string;
    quantity?: number;
    unit?: string;
    calories: number;
}

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

const DietHomeWrapper: React.FC = () => {
    const [meals, setMeals] = useState<Record<MealType, Meal[]>>({
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: []
    });
    const [userId, setUserId] = useState<string>("");
    const [totalTargetCalories, setTotalTargetCalories] = useState<number>(0);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())));
    const localDate = useMemo(() => new Date(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate()), [selectedDate]);

    const icon = useMemo(() => (
        <Image
            src="/my_boddy_buddy_support_ai_logo_white.png"
            alt="support AI logo"
            width={30}
            height={30}
        />
    ), []);

    useEffect(() => {
        const getUserId = async () => {
            try {
                const userId = await fetchUserId();
                setUserId(userId);
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };

        getUserId();
    }, []);

    useEffect(() => {
        const getData = async () => {
            if (!userId) return;
            try {
                const [mealData, targetResponse] = await Promise.all([
                    fetchMeals(userId, selectedDate),
                    axios.get("/api/targets")
                ]);

                setMeals({
                    breakfast: mealData.breakfast,
                    lunch: mealData.lunch,
                    dinner: mealData.dinner,
                    snacks: mealData.snacks
                });

                setTotalTargetCalories(targetResponse.data.targetCaloriesIntake);
            } catch (error) {
                console.error("Error fetching data:", error);
                setMeals({ breakfast: [], lunch: [], dinner: [], snacks: [] });
            }
        };

        getData();
    }, [userId, selectedDate]);

    const handleEdit = useCallback((mealType: MealType, index: number) => {
        // Handle edit logic here
    }, []);

    const handleDelete = useCallback(async (mealType: MealType, index: number) => {
        try {
            const date = format(localDate, "yyyy-MM-dd");
            await axios.delete("/api/delete-meal", {
                data: {
                    userId,
                    date,
                    mealType,
                    mealIndex: index,
                },
            });

            setMeals((prevMeals) => ({
                ...prevMeals,
                [mealType]: prevMeals[mealType].filter((_, i) => i !== index)
            }));

            toast.success("Meal item deleted successfully");
        } catch (error) {
            console.error("Error deleting meal item:", (error as Error).message);
        }
    }, [localDate, userId]);

    const handleAdd = useCallback((mealType: MealType) => {
        const date = format(localDate, "yyyy-MM-dd");
        window.location.href = `/diet/add-meals?mealType=${mealType}&date=${date}`;
    }, [localDate]);

    const handleOnClick = useCallback(() => {
        window.location.href = "/diet/ai-support";
    }, []);

    const onDateSelect = useCallback((date: Date) => {
        handleDateSelect(date, (formattedDate: string) => {
            setSelectedDate(new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())));
        });
    }, []);

    const totalCalories = useCallback((meals: Meal[]) => meals.reduce((sum, meal) => sum + meal.calories, 0), []);

    return (
        <>
            <Toaster />
            <TopCalendar onDateSelect={onDateSelect} />
            <div className="bg-white min-h-screen p-4">
                <h1 className="text-3xl font-bold flex flex-col items-center p-2 m-2">
                    Diet Log for {format(localDate, "MMMM d, yyyy")}
                </h1>
                <div className="flex flex-col items-center p-2">
                    <CalorieDistributionChart
                        breakfastCalories={totalCalories(meals.breakfast)}
                        lunchCalories={totalCalories(meals.lunch)}
                        dinnerCalories={totalCalories(meals.dinner)}
                        snackCalories={totalCalories(meals.snacks)}
                        totalTargetCalories={totalTargetCalories}
                    />
                </div>
                <div className="flex flex-col items-center p-4">
                    <AskAiButton
                        forText="Menu"
                        icon={icon}
                        onClick={handleOnClick}
                    />
                </div>
                <div className="p-2">
                    <Board
                        icon={<span>🌅</span>}
                        title="Breakfast"
                        items={meals.breakfast}
                        onEdit={(index) => handleEdit("breakfast", index)}
                        onDelete={(index) => handleDelete("breakfast", index)}
                        onAdd={() => handleAdd("breakfast")}
                    />
                </div>
                <div className="p-2">
                    <Board
                        icon={<span>🍱</span>}
                        title="Lunch"
                        items={meals.lunch}
                        onEdit={(index) => handleEdit("lunch", index)}
                        onDelete={(index) => handleDelete("lunch", index)}
                        onAdd={() => handleAdd("lunch")}
                    />
                </div>
                <div className="p-2">
                    <Board
                        icon={<span>🍲</span>}
                        title="Dinner"
                        items={meals.dinner}
                        onEdit={(index) => handleEdit("dinner", index)}
                        onDelete={(index) => handleDelete("dinner", index)}
                        onAdd={() => handleAdd("dinner")}
                    />
                </div>
                <div className="p-2">
                    <Board
                        icon={<span>🍪</span>}
                        title="Snacks"
                        items={meals.snacks}
                        onEdit={(index) => handleEdit("snacks", index)}
                        onDelete={(index) => handleDelete("snacks", index)}
                        onAdd={() => handleAdd("snacks")}
                    />
                </div>
            </div>
        </>
    );
};

export default DietHomeWrapper;
