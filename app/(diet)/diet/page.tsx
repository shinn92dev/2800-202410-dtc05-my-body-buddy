"use client";

import React, { useState } from 'react';
import Board from "@/components/global/Board";
import AskAiButton from "@/components/global/AskAiButton";

// export const metadata = {
//     title: "Diet Plan",
// };
export default function DietPlan() {
    const [items, setItems] = useState([
        { name: 'Boiled egg', amount: '1 egg', calories: 150 },
        { name: 'Corn soup', amount: '1 cup (180ml)', calories: 343 },
    ]);

    const handleEdit = (index: number) => {
        // Handle edit logic here
    };

    const handleDelete = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleAdd = () => {
        // Navigate to AddingItems page
        window.location.href = 'diet/add-items';
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
                    items={items}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                />
            </div>
            <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Ask AI for Menu</h1>
            <AskAiButton forText="Menu" />
        </div>
        </div>
    );
}