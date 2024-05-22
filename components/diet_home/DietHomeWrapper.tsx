"use client";

import React, { useState, useEffect } from 'react';
import Board from "@/components/global/Board";
import AskAiButton from "@/components/global/AskAiButton";
import axios from 'axios';
import { date } from 'zod';

export default function DietHomeWrapper() {
    const [breakfasts, setBreakfasts] = useState([]);
    const [lunches, setLunches] = useState([]);
    const [dinners, setDinners] = useState([]);
    const [snacks, setSnacks] = useState([]);
    const [userId, setUserId] = useState(''); 

    useEffect(() => {
        const fetchMeals = async () => {
            const date = new Date().toISOString().split('T')[0]; // Get today's date
            const response = await axios.get(`@/api/getMeals?userId=${userId}&date=${date}`);
            const data = response.data;
            setBreakfasts(data?.breakfast || []);
            setLunches(data?.lunch || []);
            setDinners(data?.dinner || []);
            setSnacks(data?.snacks || []);
        };

        if (userId) {
            fetchMeals();
        }
    }, [userId]);

    const handleEdit = (mealType: string, index: number) => {
        // Handle edit logic here
    };

    const handleDelete = (mealType: string, index: number) => {
        if (mealType === 'breakfast') {
            setBreakfasts(breakfasts.filter((_, i) => i !== index));
        } else if (mealType === 'lunch') {
            setLunches(lunches.filter((_, i) => i !== index));
        } else if (mealType === 'dinner') {
            setDinners(dinners.filter((_, i) => i !== index));
        } else if (mealType === 'snack') {
            setSnacks(snacks.filter((_, i) => i !== index));
        }
    };

    const handleAdd = (mealType: string) => {
        // Navigate to AddingItems page
        window.location.href = `diet/add-meals?mealType=${mealType}`;
    };

    return (
        <div>
            <h1 className="text-2xl font-bold p-2 m-2">
                This is My Body Buddy Diet Plan page
            </h1>
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
                    onEdit={(index) => handleEdit('snack', index)}
                    onDelete={(index) => handleDelete('snack', index)}
                    onAdd={() => handleAdd('snack')}
                />
            </div>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Ask AI for Menu</h1>
                <AskAiButton forText="Menu" />
            </div>
        </div>
    );
}