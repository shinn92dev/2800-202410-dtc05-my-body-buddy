"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import CircleBar from "@/components/global/CircleBar";
import Board from "@/components/global/Board";
import AskAiButton from "@/components/global/AskAiButton";
import axios from "axios";
import TopCalendar from "@/components/global/TopCalendar";
import { fetchUserId } from "@/app/_helper/fetchUserId";

import { calculateKcalForWorkout } from "@/app/_helper/workout";
import { handleDateSelect } from "@/app/_helper/handleDate";

const WorkoutHomeWrapper: React.FC = () => {
    const [achievedWorkoutData, setAchievedWorkoutData] = useState<any[]>([]);
    const [onGoingWorkoutData, setOnGoingWorkoutData] = useState<any[]>([]);
    const [userId, setUserId] = useState<string>("");

    useEffect(() => {
        const getUserId = async () => {
            try {
                const userId = await fetchUserId();
                setUserId(userId);
                console.log("userId fetched successfully.");
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };
        getUserId();
    }, []);
    const fetchWorkoutData = async () => {
        try {
            const res = await axios.get("/api/get-user-id");
            const { userId } = res.data;

            const dataRes = await axios.get(`/api/get-workout`, {
                params: {
                    userId,
                    date: selectedDate.toISOString().split("T")[0],
                },
            });
            const data = dataRes.data;
            setOnGoingWorkoutData(data.onGoing);
            setAchievedWorkoutData(data.achieved);
        } catch (error) {
            console.error("Error fetching workout data:", error);
        }
    };

    const [selectedDate, setSelectedDate] = useState<Date>(
        new Date(
            Date.UTC(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate()
            )
        )
    );

    const onDateSelect = (date: Date) => {
        handleDateSelect(date, (formattedDate: string) => {
            setSelectedDate(
                new Date(
                    Date.UTC(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate()
                    )
                )
            );
        });
    };

    useEffect(() => {
        fetchWorkoutData();
    }, [selectedDate]);

    const handleEditForAchieved = (index: number) => {
        // Handle edit logic here
    };

    const handleDeleteForAchieved = async (index: number) => {
        try {
            const item = achievedWorkoutData[index];
            const res = await axios.get("/api/get-user-id");
            const { userId } = res.data;
            console.log(item);
            console.log("Update start:", userId);
            // TODO: REPLACE DATE FROM CALENDAR DATE
            const formattedDate = selectedDate.toISOString();
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
            fetchWorkoutData();
        } catch (error) {
            console.error("Error updating achievement status:", error);
        }
    };

    const handleAddForAchieved = () => {
        window.location.href = `workout/adding`;
    };

    const handleAskAI = () => {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        window.location.href = `workout/ai-support?date=${formattedDate}`;
    };

    const handleToggleComplete = async (index: number) => {
        try {
            const item = onGoingWorkoutData[index];
            const res = await axios.get("/api/get-user-id");
            const { userId } = res.data;
            console.log(item);
            console.log("Update start:", userId);
            // TODO: REPLACE DATE FROM CALENDAR DATE
            const formattedDate = selectedDate.toISOString();
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
            fetchWorkoutData();
        } catch (error) {
            console.error("Error updating achievement status:", error);
        }
    };

    const totalCalories =
        calculateKcalForWorkout(achievedWorkoutData) +
        calculateKcalForWorkout(onGoingWorkoutData);
    return (
        <div className="p-4 items-center bg-white">
            <TopCalendar onDateSelect={onDateSelect} />
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
                        {onGoingWorkoutData.length === 0 ? (
                            <p className="font-semibold text-center">
                                🎉You finished workout for today!
                            </p>
                        ) : (
                            onGoingWorkoutData.map((item, index) => (
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
                            ))
                        )}
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
