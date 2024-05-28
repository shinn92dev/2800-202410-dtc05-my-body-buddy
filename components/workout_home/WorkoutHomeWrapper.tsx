"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import CircleBar from "@/components/global/CircleBar";
import Board from "@/components/global/Board";
import AskAiButton from "@/components/global/AskAiButton";
import axios from "axios";
import { useForm } from "react-hook-form";
import { format, formatDate } from "date-fns";
import {
    fetchWorkoutForSpecificDate,
    calculateKcalForWorkout,
    updateWorkoutStatus,
    formatDateFromInput,
} from "@/app/_helper/workout";

const WorkoutHomeWrapper: React.FC = () => {
    const [achievedWorkoutData, setAchievedWorkoutData] = useState<any[]>([]);
    const [onGoingWorkoutData, setOnGoingWorkoutData] = useState<any[]>([]);

    const fetchWorkoutData = async () => {
        try {
            const res = await axios.get("/api/get-user-id");
            const { userId } = res.data;
            console.log(userId);

            const dataRes = await axios.get(
                `/api/get-workout?userId=${userId}`
            );
            const data = dataRes.data;

            if (!data || data.workouts.length === 0) {
                await axios.post("/api/save-new-workout", {
                    userId: userId,
                    workouts: [],
                });
            } else {
                const workoutDataForDate = fetchWorkoutForSpecificDate(
                    data,
                    new Date()
                );
                setOnGoingWorkoutData(workoutDataForDate.onGoing);
                setAchievedWorkoutData(workoutDataForDate.achieved);
            }
        } catch (error) {
            console.error("Error fetching workout data:", error);
        }
    };

    useEffect(() => {
        fetchWorkoutData();
    }, []);

    const handleEditForAchieved = (index: number) => {
        // Handle edit logic here
    };

    const handleDeleteForAchieved = (index: number) => {
        // Handle delete logic here
    };

    const handleAddForAchieved = () => {
        window.location.href = `workout/adding`;
    };

    const handleAskAI = () => {
        window.location.href = "workout/ai-support";
    };

    const handleToggleComplete = async (index: number) => {
        try {
            const item = onGoingWorkoutData[index];
            const res = await axios.get("/api/get-user-id");
            const { userId } = res.data;
            console.log(item);
            console.log("Update start:", userId);
            // TODO: REPLACE DATE FROM CALENDAR DATE
            const formattedDate = new Date().toISOString();
            const newData = {
                userId: userId,
                date: formattedDate,
                name: item.name,
                achieved: !item.achieved,
            };
            const response = await fetch("/api/update-workout-achievement", {
                method: "POST",
                body: JSON.stringify(newData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response);
            const responseData = await response.json();
            console.log("Response data:", responseData);

            setOnGoingWorkoutData((prevData) => {
                const newData = [...prevData];
                newData[index] = {
                    ...newData[index],
                    isCompleted: !newData[index].achieved,
                };
                return newData;
            });

            setAchievedWorkoutData((prevData) => {
                if (item.isCompleted) {
                    return prevData.filter(
                        (workout) => workout.name !== item.name
                    );
                } else {
                    return [
                        ...prevData,
                        { ...item, isCompleted: !item.isCompleted },
                    ];
                }
            });
        } catch (error) {
            console.error("Error updating achievement status:", error);
        }
    };

    const totalCalories =
        calculateKcalForWorkout(achievedWorkoutData) +
        calculateKcalForWorkout(onGoingWorkoutData);
    return (
        <div className="p-4 items-center bg-white">
            <h1 className="text-center text-2xl font-bold">Your Progress</h1>
            <div className="flex justify-center mt-4">
                <CircleBar
                    title={
                        calculateKcalForWorkout(achievedWorkoutData) + " kcal"
                    }
                    subtitle={"/ " + totalCalories + " kcal"}
                    percent={
                        (totalCalories /
                            calculateKcalForWorkout(onGoingWorkoutData)) *
                        100
                    }
                />
            </div>
            <div className={"mt-4"}>
                <Board
                    icon={<span>🕺</span>}
                    title={"Achieved"}
                    items={achievedWorkoutData}
                    onEdit={(index) => handleEditForAchieved(index)}
                    onDelete={(index) => handleDeleteForAchieved(index)}
                    onAdd={handleAddForAchieved}
                />
            </div>
            <div className="mt-4">
                <div className="p-4 bg-beige rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <span>🏋️</span>
                            <h2 className="text-xl font-bold ml-2">
                                Workout for Today
                            </h2>
                        </div>
                        <span className="text-lg font-semibold">
                            {calculateKcalForWorkout(onGoingWorkoutData)}kcal
                        </span>
                    </div>
                    <div>
                        {onGoingWorkoutData.map((item, index) => (
                            <div
                                key={index}
                                className={`flex justify-between items-center p-2 border-b`}
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
                                        {item.quantity} {item.unit}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-lg font-semibold mr-4">
                                        {item.calories} kcal
                                    </span>
                                    <button
                                        type="button"
                                        className="px-4 py-2 rounded-full bg-gray-500 text-white"
                                        onClick={() =>
                                            handleToggleComplete(index)
                                        }
                                    >
                                        Done
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
                                    src="/my_boddy_buddy_support_ai_logo.png"
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
};

export default WorkoutHomeWrapper;
