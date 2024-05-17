"use client";

import CircleBar from "@/components/global/CircleBar";

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

export default function WorkoutHomeWrapper() {
    let totalCaloriesOfMenuForToday = menuForToday.reduce((total, item) => total + item.quantity * item.kcalPerUnit, 0);
    let totalCaloriesOfAchieved = achieved.reduce((total, item) => total + item.quantity * item.kcalPerUnit, 0);

    return (
        <div className="p-4 items-center">
            <h1 className="text-center text-2xl font-bold">Your Progress</h1>
            <div className="flex justify-center mt-4">
                <CircleBar title={totalCaloriesOfAchieved + " kcal"} subtitle={"/ " + totalCaloriesOfMenuForToday + " kcal"} percent={(totalCaloriesOfAchieved / totalCaloriesOfMenuForToday) * 100} />
            </div>
        </div>
    );
}
