"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import CircleBar from "@/components/global/CircleBar";
import Board from "@/components/global/Board";
import AskAiButton from "@/components/global/AskAiButton";

const defaultAchieved = [
    { title: "Walking", quantity: 45, unit: "min", kcalPerUnit: 3.5 },
    { title: "Push-ups", quantity: 50, unit: "reps", kcalPerUnit: 0.32 },
];

export default function WorkoutHomeWrapper({
    totalWorkoutData,
    achievedWorkoutData,
}: {
    totalWorkoutData: any;
    achievedWorkoutData: any;
}) {
    const parsedTotalWorkoutData = JSON.parse(totalWorkoutData);
    const parsedAchievedWorkoutData = JSON.parse(achievedWorkoutData);
    const [menuForToday, setMenuForToday] = useState(parsedTotalWorkoutData);
    const [achieved, setAchieved] = useState(parsedAchievedWorkoutData);

    const calculateTotalCalories = (
        items: { quantity: number; kcalPerUnit: number }[]
    ) => {
        return items.reduce(
            (total, item) => total + item.quantity * item.kcalPerUnit,
            0
        );
    };
    const [totalCaloriesOfMenuForToday, setTotalCaloriesOfMenuForToday] =
        useState(calculateTotalCalories(menuForToday));
    const [totalCaloriesOfAchieved, setTotalCaloriesOfAchieved] = useState(
        calculateTotalCalories(achieved)
    );
    // console.log("OUTPUT FROM HOMEWRAPPER", workoutData);
    const convertToItems = (
        items: {
            title: string;
            count: number;
            unit: string;
            cals: number;
            achieved?: boolean;
        }[]
    ) => {
        return items.map((item) => {
            return {
                name: item.title,
                amount: item.count + " " + item.unit,
                calories: item.count * item.cals,
                ...(item.achieved !== undefined && {
                    isCompleted: item.achieved,
                }),
            };
        });
    };

    const [menuForTodayItems, setMenuForTodayItems] = useState(
        convertToItems(menuForToday)
    );
    const [achievedItems, setAchievedItems] = useState(
        convertToItems(achieved)
    );

    useEffect(() => {
        setTotalCaloriesOfAchieved(calculateTotalCalories(achieved));
        setAchievedItems(convertToItems(achieved));
        setMenuForTodayItems(convertToItems(menuForToday));
    }, [menuForToday, achieved]);

    const handleEditForAchieved = (index: number) => {
        // Handle edit logic here
    };

    const handleDeleteForAchieved = (index: number) => {
        setAchieved((prevAchieved) => {
            const newAchieved = prevAchieved.filter((_, i) => i !== index);
            return newAchieved;
        });
    };

    const handleAddForAchieved = () => {
        // Navigate to AddingItems page
        window.location.href = `workout/adding`;
    };

    const handleEditForMenuForToday = (index: number) => {
        // Handle edit logic here
    };

    const handleDeleteForMenuForToday = (index: number) => {
        // Handle delete logic here
    };

    const handleAddForMenuForToday = () => {
        // Handle add logic here
    };

    const handleToggleComplete = (index: number) => {
        setMenuForToday((prevMenu) => {
            const newMenu = [...prevMenu];
            const item = { ...newMenu[index] };
            item.isCompleted = !item.isCompleted;

            // Update the new menu
            newMenu[index] = item;

            return newMenu;
        });

        // Update achieved state based on item completion status
        setAchieved((prevAchieved) => {
            const item = menuForToday[index];
            if (item.isCompleted) {
                // Remove from achieved
                return prevAchieved.filter(
                    (achievedItem) => achievedItem.title !== item.title
                );
            } else {
                // Add to achieved
                return [...prevAchieved, item];
            }
        });
    };

    const handleAskAI = () => {
        window.location.href = "workout/ai-support";
    };

    return (
        <div className="p-4 items-center">
            <h1 className="text-center text-2xl font-bold">Your Progress</h1>
            <div className="flex justify-center mt-4">
                <CircleBar
                    title={totalCaloriesOfAchieved + " kcal"}
                    subtitle={"/ " + totalCaloriesOfMenuForToday + " kcal"}
                    percent={
                        (totalCaloriesOfAchieved /
                            totalCaloriesOfMenuForToday) *
                        100
                    }
                />
            </div>
            <div className={"mt-4"}>
                <Board
                    icon={<span>🕺</span>}
                    title={"Achieved"}
                    items={achievedItems}
                    onEdit={(index) => handleEditForAchieved(index)}
                    onDelete={(index) => handleDeleteForAchieved(index)}
                    onAdd={handleAddForAchieved}
                />
            </div>
            <div className="mt-4">
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <span>🏋️</span>
                            <h2 className="text-xl font-bold ml-2">
                                Menu for Today
                            </h2>
                        </div>
                        <span className="text-lg font-semibold">
                            {menuForTodayItems.reduce(
                                (total, item) => total + item.calories,
                                0
                            )}{" "}
                            kcal
                        </span>
                    </div>
                    <div>
                        {menuForTodayItems.map((item, index) => (
                            <div
                                key={index}
                                className={`flex justify-between items-center p-2 border-b ${
                                    item.isCompleted ? "text-gray-300" : ""
                                }`}
                            >
                                <div>
                                    <p
                                        className={`font-semibold ${
                                            item.isCompleted
                                                ? "line-through"
                                                : ""
                                        }`}
                                    >
                                        {item.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {item.amount}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-lg font-semibold mr-4">
                                        {item.calories} kcal
                                    </span>
                                    <button
                                        onClick={() =>
                                            handleToggleComplete(index)
                                        }
                                        className={`px-4 py-2 rounded-full ${
                                            item.isCompleted
                                                ? "bg-white text-gray-500 border"
                                                : "bg-gray-500 text-white"
                                        }`}
                                    >
                                        {item.isCompleted ? "Undo" : "Done"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-4">
                        <AskAiButton
                            forText={"Alternative"}
                            icon={
                                <Image
                                    src="/my_boddy_buddy_support_ai_logo.jpg"
                                    alt="AI Logo"
                                    className="ml-2"
                                    width={24}
                                    height={24}
                                />
                            }
                            onClick={handleAskAI}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
