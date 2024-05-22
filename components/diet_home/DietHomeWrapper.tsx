"use client";

import React, { useState, useEffect } from 'react';
import Board from "@/components/global/Board";
import AskAiButton from "@/components/global/AskAiButton";
import axios from 'axios';
import Image from 'next/image';
import CalorieDistributionChart from '@/components/global/CalorieDistributionChart';

interface Meal {
    name: string;
    amount: string;
    calories: number;
}

const DietHomeWrapper: React.FC = () => {
    const [breakfasts, setBreakfasts] = useState<Meal[]>([]);
    const [lunches, setLunches] = useState<Meal[]>([]);
    const [dinners, setDinners] = useState<Meal[]>([]);
    const [snacks, setSnacks] = useState<Meal[]>([]);
    const [userId, setUserId] = useState<string>('');
    const [totalTargetCalories, setTotalTargetCalories] = useState<number>(2200); // Example target calories

    const icon = <Image src="/my_boddy_buddy_support_ai_logo.jpg" alt="support AI logo" width={30} height={30} />

    useEffect(() => {
        const fetchUserId = async () => {
            const fetchedUserId = "664719634ee345ddb6962d13"; // Temporary user ID
            setUserId(fetchedUserId);
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchMeals = async () => {
            if (!userId) return;
            const date = new Date().toISOString().split('T')[0];
            try {
                const response = await axios.get(`/api/get-meals?userId=${userId}&date=${date}`);
                const data = response.data;
                setBreakfasts(data.breakfast || []);
                setLunches(data.lunch || []);
                setDinners(data.dinner || []);
                setSnacks(data.snacks || []);
            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };

        fetchMeals();
    }, [userId]);

    const handleEdit = (mealType: string, index: number) => {
        // Handle edit logic here
    };

    const handleDelete = async (mealType: string, index: number) => {
        try {
            const date = new Date().toISOString().split('T')[0];
            await axios.delete('/api/delete-meal', {
                data: {
                    userId,
                    date,
                    mealType,
                    mealIndex: index,
                },
            });

            if (mealType === 'breakfast') {
                setBreakfasts(breakfasts.filter((_, i) => i !== index));
            } else if (mealType === 'lunch') {
                setLunches(lunches.filter((_, i) => i !== index));
            } else if (mealType === 'dinner') {
                setDinners(dinners.filter((_, i) => i !== index));
            } else if (mealType === 'snacks') {
                setSnacks(snacks.filter((_, i) => i !== index));
            }
        } catch (error) {
            console.error('Error deleting meal item:', error);
        }
    };

    const handleAdd = (mealType: string) => {
        // Navigate to AddingItems page
        window.location.href = `/diet/add-meals?mealType=${mealType}`;
    };

    const handleOnClick = () => {
        // Handle onClick logic here
    };

    const totalCalories = (meals: Meal[]) => meals.reduce((sum, meal) => sum + meal.calories, 0);

    return (
        <div>
            <h1 className="text-2xl font-bold p-2 m-2">
                This is My Body Buddy Diet Plan page
            </h1>
            <div className="flex flex-col items-center p-4">
                <CalorieDistributionChart
                    breakfastCalories={totalCalories(breakfasts)}
                    lunchCalories={totalCalories(lunches)}
                    dinnerCalories={totalCalories(dinners)}
                    snackCalories={totalCalories(snacks)}
                    totalTargetCalories={totalTargetCalories}
                />
            </div>
            <div className="p-4">
                <Board
                    icon={<span>🌅</span>}
                    title="Breakfast"
                    items={breakfasts}
                    onEdit={(index) => handleEdit('breakfast', index)}
                    onDelete={(index) => handleDelete('breakfast', index)}
                    onAdd={() => handleAdd('breakfast')}
                />
            </div>
            <div className="p-4">
                <Board
                    icon={<span>🌞</span>}
                    title="Lunch"
                    items={lunches}
                    onEdit={(index) => handleEdit('lunch', index)}
                    onDelete={(index) => handleDelete('lunch', index)}
                    onAdd={() => handleAdd('lunch')}
                />
            </div>
            <div className="p-4">
                <Board
                    icon={<span>🌜</span>}
                    title="Dinner"
                    items={dinners}
                    onEdit={(index) => handleEdit('dinner', index)}
                    onDelete={(index) => handleDelete('dinner', index)}
                    onAdd={() => handleAdd('dinner')}
                />
            </div>
            <div className="p-4">
                <Board
                    icon={<span>🍪</span>}
                    title="Snacks"
                    items={snacks}
                    onEdit={(index) => handleEdit('snacks', index)}
                    onDelete={(index) => handleDelete('snacks', index)}
                    onAdd={() => handleAdd('snacks')}
                />
            </div>
            <div className="flex flex-col items-center p-4">
                <AskAiButton forText="Menu" icon={icon} onClick={handleOnClick} />
            </div>
        </div>
    );
};

export default DietHomeWrapper;
