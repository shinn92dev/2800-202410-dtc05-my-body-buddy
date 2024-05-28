"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import CircleBar from "@/components/global/CircleBar";
import Board from "@/components/global/Board";
import AskAiButton from "@/components/global/AskAiButton";
import axios from "axios";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import {
    fetchWorkoutForSpecificDate,
    calculateKcalForWorkout,
} from "@/app/_helper/workout";

const routeWorkoutHomeWrapperPost = async (
    userId: string,
    date: Date,
    workoutTitle: string
) => {
    try {
        const formattedDate = new Date(
            `${date.getUTCFullYear()}-${
                date.getUTCMonth() + 1
            }-${date.getUTCDate()}`
        );
        const response = await fetch("/api/workout-wrapper", {
            method: "POST",
            body: JSON.stringify({
                userId: userId,
                date: formattedDate,
                title: workoutTitle,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Response from workout home wrapper:", response);
        if (!response.ok) {
            throw new Error("Not OK");
        }
        const data = await response.json();
        console.log("Server Response:", data);
    } catch (error) {
        console.log(error);
    }
};

const WorkoutHomeWrapper: React.FC = () => {
    const [menuForToday, setMenuForToday] = useState<any[]>([]);
    const [achieved, setAchieved] = useState<any[]>([]);
    const [achievedWorkoutData, setAchievedWorkoutData] = useState<any[]>([]);
    const [onGoingWorkoutData, setOnGoingWorkoutData] = useState<any[]>([]);
    const calculateTotalCalories = (
        items: { quantity: number; kcalPerUnit: number }[]
    ) => {
        return items.reduce(
            (total, item) => total + item.quantity * item.kcalPerUnit,
            0
        );
    };

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

    const [totalCaloriesOfMenuForToday, setTotalCaloriesOfMenuForToday] =
        useState(calculateTotalCalories(menuForToday));
    const [totalCaloriesOfAchieved, setTotalCaloriesOfAchieved] = useState(
        calculateTotalCalories(achieved)
    );

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
        setAchieved((prevAchieved: any) => {
            const newAchieved = prevAchieved.filter(
                (_: any, i: any) => i !== index
            );
            return newAchieved;
        });
    };

    const handleAddForAchieved = () => {
        window.location.href = `workout/adding`;
    };

    const handleToggleComplete = async (index: number) => {
        try {
            const item = menuForToday[index];
            const res = await axios.put(`/api/update-workout-achievement`, {
                userId: item.userId,
                date: item.date,
                title: item.name,
                achieved: !item.isCompleted,
            });

            if (res.status === 200) {
                setMenuForToday((prevMenu: any) => {
                    const newMenu = [...prevMenu];
                    newMenu[index].isCompleted = !newMenu[index].isCompleted;
                    return newMenu;
                });

                setAchieved((prevAchieved: any) => {
                    const newAchieved = menuForToday[index].isCompleted
                        ? prevAchieved.filter(
                              (achievedItem: any) =>
                                  achievedItem.title !== item.name
                          )
                        : [...prevAchieved, item];
                    return newAchieved;
                });
            } else {
                throw new Error("Failed to update achievement status");
            }
        } catch (error) {
            console.error("Error updating achievement status:", error);
        }
    };

    const handleAskAI = () => {
        window.location.href = "workout/ai-support";
    };

    const { handleSubmit } = useForm();
    const onSubmit = async () => {
        try {
            const res = await axios.get("/api/get-user-id");
            const { userId } = res.data;

            await routeWorkoutHomeWrapperPost(userId, new Date(), "Running");
        } catch (error) {
            console.log(error);
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
                                    <form
                                        method="post"
                                        onSubmit={handleSubmit(onSubmit)}
                                    >
                                        <button
                                            type="submit"
                                            onClick={() =>
                                                handleToggleComplete(index)
                                            }
                                            className="px-4 py-2 rounded-full bg-gray-500 text-white"
                                        >
                                            Done
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-4">
                        <AskAiButton
                            forText={"Alternative"}
                            icon={
                                <Image
                                    src="/my_boddy_buddy_support_ai_logo_white.png"
                                    alt="AI Logo"
                                    className="ml-2"
                                    width={30}
                                    height={30}
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
