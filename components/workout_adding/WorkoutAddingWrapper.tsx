"use client";

import { useState } from "react";

const category = [
    {"name": "Walking", "image": "/workout_category/walking.png", "image_selected": "/workout_category/walking_selected.png"},
    {"name": "Running", "image": "/workout_category/running.png", "image_selected": "/workout_category/running_selected.png"},
    {"name": "Cycling", "image": "/workout_category/cycling.png", "image_selected": "/workout_category/cycling_selected.png"},
    {"name": "Gym training", "image": "/workout_category/gym_training.png", "image_selected": "/workout_category/gym_training_selected.png"},
    {"name": "Other sports", "image": "/workout_category/other_sports.png", "image_selected": "/workout_category/other_sports_selected.png"}
]

const workoutItemOptions = [
    {"category": "Gym training", "name": "Push-ups", "recordOptions": [{"unit": "min", "kcalPerUnit": 1.6}, {"unit": "reps", "kcalPerUnit": 0.32}]},
    {"category": "Gym training", "name": "Crunches", "recordOptions": [{"unit": "min", "kcalPerUnit": 0.8}, {"unit": "reps", "kcalPerUnit": 0.16}]},
    {"category": "Other sports", "name": "Swimming", "recordOptions": [{"unit": "min", "kcalPerUnit": 2.4}, {"unit": "m", "kcalPerUnit": 0.08}]},
    {"category": "Other sports", "name": "Basketball", "recordOptions": [{"unit": "min", "kcalPerUnit": 2.8}]},
    {"category": "Other sports", "name": "Soccer", "recordOptions": [{"unit": "min", "kcalPerUnit": 2.4}]},
    {"category": "Other sports", "name": "Tennis", "recordOptions": [{"unit": "min", "kcalPerUnit": 2.4}]},
    {"category": "Other sports", "name": "Volleyball", "recordOptions": [{"unit": "min", "kcalPerUnit": 1.5}]},
    {"category": "Other sports", "name": "Table tennis", "recordOptions": [{"unit": "min", "kcalPerUnit": 1.5}]},
    {"category": "Other sports", "name": "Badminton", "recordOptions": [{"unit": "min", "kcalPerUnit": 2.8}]},
    {"category": "Other sports", "name": "Baseball", "recordOptions": [{"unit": "min", "kcalPerUnit": 1.0}]},
]

export default function WorkoutAddingWrapper() {
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    return (
        <div>
            <h1>Category</h1>
        </div>
    );
}
