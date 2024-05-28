"use client";

import React, { useState, useEffect } from "react";
import Board from "@/components/global/Board";
import AskAiButton from "@/components/global/AskAiButton";
import Image from "next/image";
import CalorieDistributionChart from "@/components/global/CalorieDistributionChart";
import TopCalendar from "@/components/global/TopCalendar";
import { fetchUserId } from "@/app/_helper/fetchUserId";
import { fetchMeals } from "@/app/_helper/fetchMeals";
import { handleDateSelect } from "@/app/_helper/handleDate";
import { format } from "date-fns";
import axios from "axios";

interface Meal {
    name: string;
    quantity?: number;
    unit?: string;
    calories: number;
}

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

const DietHomeWrapper: React.FC = () => {
    const [breakfasts, setBreakfasts] = useState<Meal[]>([]);
    const [lunches, setLunches] = useState<Meal[]>([]);
    const [dinners, setDinners] = useState<Meal[]>([]);
    const [snacks, setSnacks] = useState<Meal[]>([]);
    const [userId, setUserId] = useState<string>("");
    const [totalTargetCalories, setTotalTargetCalories] = useState<number>(2200);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())));
    const localDate = new Date(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate());

    const icon = (
        <Image
            src="/my_boddy_buddy_support_ai_logo.png"
            alt="support AI logo"
            width={30}
            height={30}
        />
    );

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
        const getMeals = async () => {
            if (!userId) return;
            try {
                const { breakfast, lunch, dinner, snacks } = await fetchMeals(userId, selectedDate);
                setBreakfasts(breakfast);
                setLunches(lunch);
                setDinners(dinner);
                setSnacks(snacks);
            } catch (error) {
                console.error("Error fetching meals:", error);
                // Set to empty arrays if an error occurs
                setBreakfasts([]);
                setLunches([]);
                setDinners([]);
                setSnacks([]);
            }
        };

        getMeals();
    }, [userId, selectedDate]);

    const handleEdit = (mealType: MealType, index: number) => {
        // Handle edit logic here
    };

    const handleDelete = async (mealType: MealType, index: number) => {
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

            if (mealType === "breakfast") {
                setBreakfasts(breakfasts.filter((_, i) => i !== index));
            } else if (mealType === "lunch") {
                setLunches(lunches.filter((_, i) => i !== index));
            } else if (mealType === "dinner") {
                setDinners(dinners.filter((_, i) => i !== index));
            } else if (mealType === "snacks") {
                setSnacks(snacks.filter((_, i) => i !== index));
            }
        } catch (error) {
            console.error("Error deleting meal item:", (error as Error).message);
        }
    };

    const handleAdd = (mealType: MealType) => {
        const date = format(localDate, "yyyy-MM-dd");
        window.location.href = `/diet/add-meals?mealType=${mealType}&date=${date}`;
    };

    const handleOnClick = () => {
        window.location.href = "/diet/ai-support";
    };

    const onDateSelect = (date: Date) => {
        handleDateSelect(date, (formattedDate: string) => {
            setSelectedDate(new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())));
        });
    };

    const totalCalories = (meals: Meal[]) => meals.reduce((sum, meal) => sum + meal.calories, 0);

    return (
        <div className="bg-white min-h-screen p-4">
            <TopCalendar onDateSelect={onDateSelect} />
            <h1 className="text-3xl font-bold flex flex-col items-center p-2 m-2">
                Diet Menu for {format(localDate, "MMMM d, yyyy")}
            </h1>
            <div className="flex flex-col items-center p-2">
                <CalorieDistributionChart
                    breakfastCalories={totalCalories(breakfasts)}
                    lunchCalories={totalCalories(lunches)}
                    dinnerCalories={totalCalories(dinners)}
                    snackCalories={totalCalories(snacks)}
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
            <div className="p-4">
                <Board
                    icon={<span>🌅</span>}
                    title="Breakfast"
                    items={breakfasts}
                    onEdit={(index) => handleEdit("breakfast", index)}
                    onDelete={(index) => handleDelete("breakfast", index)}
                    onAdd={() => handleAdd("breakfast")}
                />
            </div>
            <div className="p-4">
                <Board
                    icon={<span>🍱</span>}
                    title="Lunch"
                    items={lunches}
                    onEdit={(index) => handleEdit("lunch", index)}
                    onDelete={(index) => handleDelete("lunch", index)}
                    onAdd={() => handleAdd("lunch")}
                />
            </div>
            <div className="p-4">
                <Board
                    icon={<span>🍲</span>}
                    title="Dinner"
                    items={dinners}
                    onEdit={(index) => handleEdit("dinner", index)}
                    onDelete={(index) => handleDelete("dinner", index)}
                    onAdd={() => handleAdd("dinner")}
                />
            </div>
            <div className="p-4">
                <Board
                    icon={<span>🍪</span>}
                    title="Snacks"
                    items={snacks}
                    onEdit={(index) => handleEdit("snacks", index)}
                    onDelete={(index) => handleDelete("snacks", index)}
                    onAdd={() => handleAdd("snacks")}
                />
            </div>
        </div>
    );
};

export default DietHomeWrapper;
