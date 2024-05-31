"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import CircleBar from "@/components/global/CircleBar";
import Board from "@/components/global/Board";
import AskAiButton from "@/components/global/AskAiButton";
import axios from "axios";
import TopCalendar from "@/components/global/TopCalendar";
import {
    fetchUserId,
    useCurrentUserInformation,
} from "@/app/_helper/fetchUserId";

import { calculateKcalForWorkout } from "@/app/_helper/workout";
import { handleDateSelect } from "@/app/_helper/handleDate";
import LoadingAnimation from "@/components/global/LoadingAnimation";

const WorkoutHomeWrapper: React.FC = () => {
    const [achievedWorkoutData, setAchievedWorkoutData] = useState<any[]>([]);
    const [onGoingWorkoutData, setOnGoingWorkoutData] = useState<any[]>([]);
    const [userId, setUserId] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [generatingMenuFailed, setGeneratingMenuFailed] =
        useState<boolean>(false);
    const [formattingMenuFailed, setFormattingMenuFailed] =
        useState<boolean>(false);
    const [generatedWorkoutMenus, setGeneratedWorkoutMenus] = useState<any[][]>(
        []
    );

    const parseWorkoutMenu = (data: string) => {
        const dayRegExp = /Day \d+:/g;
        const itemRegExp = /・(.+?) - (\d+) (\w+).+\((\d+) kcal\)/g;

        // Remove any leading text before "Day 1" to ensure the first element is correct
        const cleanData = data.replace(/^[\s\S]*?(?=Day 1:)/, "");

        const days = data.split(dayRegExp).filter(Boolean);
        const menus = days.map((day) => {
            const items = [];
            let match;
            while ((match = itemRegExp.exec(day)) !== null) {
                const name = match[1];
                const quantity = parseInt(match[2]);
                const unit = match[3];
                const calories = parseInt(match[4]);
                const kcalPerUnit = parseFloat(
                    (calories / quantity).toFixed(1)
                );
                items.push({ name, quantity, unit, kcalPerUnit, calories });
            }
            return items;
        });
        // Remove the first element if it's empty
        if (menus.length > 0 && menus[0].length === 0) {
            menus.shift();
        }

        return menus;
    };

    const generateWorkoutMenu = async () => {
        setIsLoading(true);
        setGeneratingMenuFailed(false);
        setFormattingMenuFailed(false);

        const response = await fetch("/api/generate-workout-menu", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(
                `Original generated response from ChatGPT:\n${data.result}`
            );
            const menus = parseWorkoutMenu(data.result);

            const isValidMenu =
                menus.every((dayMenu) =>
                    dayMenu.every(
                        (item) =>
                            typeof item.name === "string" &&
                            typeof item.quantity === "number" &&
                            typeof item.unit === "string" &&
                            typeof item.calories === "number"
                    )
                ) && menus.length === 7;
            console.log(menus, "PARSED WORKOUT FROM CLIENT");
            if (isValidMenu) {
                setGeneratedWorkoutMenus(menus);
                const dataRes = await axios.post(`/api/add-workout`, {
                    params: {
                        date: selectedDate.toISOString().split("T")[0],
                        workouts: menus,
                        type: "seven-days-workout",
                    },
                });
                const data = dataRes.data;
                console.log(data, "?????????????????????");

                if (data.message === "Not allowed new workout AI generation") {
                    alert(data.data);
                    window.location.href = "/workout";
                    return;
                }

                setOnGoingWorkoutData(data.data.onGoing);
                alert(
                    `Workout out for 7 days from ${selectedDate} generated and saved!`
                );
            } else {
                console.error(
                    "Generated workout menus could not be formatted properly."
                );
                setFormattingMenuFailed(true);
            }
        } else {
            console.error("Failed to generate workout menu");
            setGeneratingMenuFailed(true);
        }

        setIsLoading(false);
    };

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
        const formattedDate = selectedDate.toISOString().split("T")[0];
        window.location.href = `workout/adding?date=${formattedDate}`;
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
        <>
        <TopCalendar onDateSelect={onDateSelect} />
        <div className="p-4 items-center bg-white">
            <h1 className="text-center text-2xl font-bold">Your Progress</h1>
            <div className="flex justify-center mt-4">
                <CircleBar
                    title={
                        calculateKcalForWorkout(achievedWorkoutData) + " kcal"
                    }
                    subtitle={"/ " + totalCalories + " kcal"}
                    percent={
                        ((totalCalories -
                            calculateKcalForWorkout(onGoingWorkoutData)) /
                            totalCalories) *
                        100
                    }
                />
            </div>
            <div className={"p-2"}>
                <Board
                    icon={<span>🕺</span>}
                    title={"Achieved"}
                    items={achievedWorkoutData}
                    onEdit={(index) => handleEditForAchieved(index)}
                    onDelete={(index) => handleDeleteForAchieved(index)}
                    onAdd={handleAddForAchieved}
                />
            </div>
            <div className="p-2">
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
                            formattingMenuFailed ? (
                                <p className="font-semibold text-center">
                                    Failed to format generated workout
                                </p>
                            ) : generatingMenuFailed ? (
                                <p className="font-semibold text-center">
                                    Failed to generate workout
                                </p>
                            ) : (
                                <p className="font-semibold text-center">
                                    No workout set yet
                                </p>
                            )
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
                        {onGoingWorkoutData.length === 0 ? (
                            <AskAiButton
                                forText={`${
                                    formattingMenuFailed || generatingMenuFailed
                                        ? "Regenerate"
                                        : "Generate Workout"
                                }`}
                                icon={
                                    <Image
                                        src="/my_boddy_buddy_support_ai_logo_white.png"
                                        alt="AI Logo"
                                        className="ml-2"
                                        width={30}
                                        height={30}
                                    />
                                }
                                onClick={generateWorkoutMenu}
                            />
                        ) : (
                            <AskAiButton
                                forText={`Alternative`}
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
                        )}
                    </div>
                    <div>
                        {isLoading && <LoadingAnimation></LoadingAnimation>}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default WorkoutHomeWrapper;
