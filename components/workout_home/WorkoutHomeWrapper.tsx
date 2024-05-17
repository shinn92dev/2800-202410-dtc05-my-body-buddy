"use client";

import React, { useState, useEffect } from 'react';
import CircleBar from "@/components/global/CircleBar";
import Board from "@/components/global/Board";

const defaultMenuForToday = [
    { "title": "Walking", "quantity": 45, "unit": "min", "kcalPerUnit": 3.5, "isCompleted": true },
    { "title": "Push-ups", "quantity": 50, "unit": "reps", "kcalPerUnit": 0.32, "isCompleted": true },
    { "title": "Crunches", "quantity": 50, "unit": "reps", "kcalPerUnit": 4.92, "isCompleted": false },
    { "title": "Cycling", "quantity": 4, "unit": "km", "kcalPerUnit": 30, "isCompleted": false }
];

const defaultAchieved = [
    { "title": "Walking", "quantity": 45, "unit": "min", "kcalPerUnit": 3.5 },
    { "title": "Push-ups", "quantity": 50, "unit": "reps", "kcalPerUnit": 0.32 },
];

export default function WorkoutHomeWrapper() {
    const [menuForToday, setMenuForToday] = useState(defaultMenuForToday);
    const [achieved, setAchieved] = useState(defaultAchieved);

    const calculateTotalCalories = (items: { quantity: number; kcalPerUnit: number }[]) => {
        return items.reduce((total, item) => total + item.quantity * item.kcalPerUnit, 0);
    };

    const [totalCaloriesOfMenuForToday, setTotalCaloriesOfMenuForToday] = useState(calculateTotalCalories(menuForToday));
    const [totalCaloriesOfAchieved, setTotalCaloriesOfAchieved] = useState(calculateTotalCalories(achieved));

    const convertToItems = (items: { title: string; quantity: number; unit: string; kcalPerUnit: number }[]) => {
        return items.map((item) => {
            return { name: item.title, amount: item.quantity + " " + item.unit, calories: item.quantity * item.kcalPerUnit };
        });
    };

    const [menuForTodayItems, setMenuForTodayItems] = useState(convertToItems(menuForToday));
    const [achievedItems, setAchievedItems] = useState(convertToItems(achieved));

    useEffect(() => {
        setTotalCaloriesOfAchieved(calculateTotalCalories(achieved));
        setAchievedItems(convertToItems(achieved));
    }, [achieved]);

    const handleEditForAchieved = (index: number) => {
        // Handle edit logic here
    };

    const handleDeleteForAchieved = (index: number) => {
        setAchieved(prevAchieved => {
            const newAchieved = prevAchieved.filter((_, i) => i !== index);
            return newAchieved;
        });
    };

    const handleAddForAchieved = () => {
        // Navigate to AddingItems page
        window.location.href = `workout/adding`;
    };

    return (
        <div className="p-4 items-center">
            <h1 className="text-center text-2xl font-bold">Your Progress</h1>
            <div className="flex justify-center mt-4">
                <CircleBar title={totalCaloriesOfAchieved + " kcal"} subtitle={"/ " + totalCaloriesOfMenuForToday + " kcal"} percent={(totalCaloriesOfAchieved / totalCaloriesOfMenuForToday) * 100} />
            </div>
            <div className={"mt-4"}>
                <Board icon={<span>🕺</span>} title={"Achieved"} items={achievedItems} onEdit={(index) => handleEditForAchieved(index)} onDelete={(index) => handleDeleteForAchieved(index)} onAdd={handleAddForAchieved} />
            </div>
            <div className={"mt-4"}>
                <Board icon={<span>🏋️</span>} title={"Menu for Today"} items={menuForTodayItems} onEdit={(index) => handleEditForAchieved(index)} onDelete={(index) => handleDeleteForAchieved(index)} onAdd={handleAddForAchieved} />
            </div>
        </div>
    );
}
