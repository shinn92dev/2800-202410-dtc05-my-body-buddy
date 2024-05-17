"use client";

import CircleBar from "@/components/global/CircleBar";
import Board from "@/components/global/Board";

const menuForToday = [
    { "title": "Walking", "quantity": 45, "unit": "min", "kcalPerUnit": 3.5, "isCompleted": true },
    { "title": "Push-ups", "quantity": 50, "unit": "reps", "kcalPerUnit": 0.32, "isCompleted": true },
    { "title": "Crunches", "quantity": 50, "unit": "reps", "kcalPerUnit": 4.92, "isCompleted": false },
    { "title": "Cycling", "quantity": 4, "unit": "km", "kcalPerUnit": 30, "isCompleted": false }
];

const achieved = [
    { "title": "Walking", "quantity": 45, "unit": "min", "kcalPerUnit": 3.5 },
    { "title": "Push-ups", "quantity": 50, "unit": "reps", "kcalPerUnit": 0.32 },
];

const handleEdit = (index: number) => {
    // Handle edit logic here
}

const handleDelete = (index: number) => {
    // Handle delete logic here
}

const handleAdd = () => {
    // Navigate to AddingItems page
    window.location.href = `workout/adding`;
}

export default function WorkoutHomeWrapper() {
    let totalCaloriesOfMenuForToday = menuForToday.reduce((total, item) => total + item.quantity * item.kcalPerUnit, 0);
    let totalCaloriesOfAchieved = achieved.reduce((total, item) => total + item.quantity * item.kcalPerUnit, 0);

    // make a list of { name: string; amount: string; calories: number } based on menuForToday in order to pass it to Board component
    let menuForTodayItems = menuForToday.map((item) => {
        return { name: item.title, amount: item.quantity + " " + item.unit, calories: item.quantity * item.kcalPerUnit };
    });

    // make a list of { name: string; amount: string; calories: number } based on achieved in order to pass it to Board component
    let achievedItems = achieved.map((item) => {
        return { name: item.title, amount: item.quantity + " " + item.unit, calories: item.quantity * item.kcalPerUnit };
    });

    return (
        <div className="p-4 items-center">
            <h1 className="text-center text-2xl font-bold">Your Progress</h1>
            <div className="flex justify-center mt-4">
                <CircleBar title={totalCaloriesOfAchieved + " kcal"} subtitle={"/ " + totalCaloriesOfMenuForToday + " kcal"} percent={(totalCaloriesOfAchieved / totalCaloriesOfMenuForToday) * 100} />
            </div>
            <div className={"mt-4"}>
                <Board icon={<span>🕺</span>} title={"Achieved"} items={achievedItems} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd} />
            </div>
            <div className={"mt-4"}>
                <Board icon={<span>🏋️</span>} title={"Menu for Today"} items={menuForTodayItems} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd} />
            </div>
        </div>
    );
}
