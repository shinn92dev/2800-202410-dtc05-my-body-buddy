"use client";

import React, { useState } from 'react';
import Board from "@/components/global/Board";
import AskAiButton from "@/components/global/AskAiButton";

export default function DietHomeWrapper() {
    const [breakfasts, setBreakfasts] = useState([
        { name: 'Boiled egg', amount: '1 egg', calories: 150 },
        { name: 'Corn soup', amount: '1 cup (180ml)', calories: 343 },
    ]);

    const [lunches, setLunches] = useState([
        { name: 'Grilled chicken', amount: '200g', calories: 400 },
        { name: 'Salad', amount: '1 bowl', calories: 150 },
    ]);

    const [dinners, setDinners] = useState([
        { name: 'Steak', amount: '300g', calories: 700 },
        { name: 'Mashed potatoes', amount: '1 cup', calories: 250 },
    ]);

    const [snacks, setSnacks] = useState([
        { name: 'Apple', amount: '1 medium', calories: 95 },
        { name: 'Yogurt', amount: '1 cup', calories: 100 },
    ]);

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
        window.location.href = `diet/add-items?mealType=${mealType}`;
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