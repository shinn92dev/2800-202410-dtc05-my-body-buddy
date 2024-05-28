"use client";

import React, { useEffect, useState } from "react";
import TopCalendar from "@/components/global/TopCalendar";
import ScoreCircleBarWrapper from "@/components/summary_score_circle_bar/ScoreCircleBarWrapper";
import BarGraph from "@/components/global/BarGraph";
import WorkoutDietLink from "@/components/workout_diet_link/WorkoutDietLink";
import AverageCalorieBanner from "@/components/global/AverageCalorieBanner";
import axios from "axios";
import { handleDateSelect } from "@/app/_helper/handleDate"; 

type WorkoutType = {
    name: string;
    duration?: number;
    caloriesBurned: number;
};

type WorkoutsData = {
    userId: string;
    date: string;
    workouts: WorkoutType[];
};

export default function WorkoutSummary() {
    const [workouts, setWorkouts] = useState<WorkoutsData | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [errorStatus, setErrorStatus] = useState<number | null>(null); 
    const [weeklyWorkouts, setWeeklyWorkouts] = useState<WorkoutsData[]>([]);
    const [weekRange, setWeekRange] = useState<string>("");
    const [monthlyTotalCalories, setMonthlyTotalCalories] = useState<number>(0);
    const [weeklyTotalCalories, setWeeklyTotalCalories] = useState<number>(0);
    const [dailyTotalCalories, setDailyTotalCalories] = useState<number>(0);
    const [score, setScore] = useState<number>(80);
    const [percent, setPercent] = useState<number>(80);
    const maxCalories = 5000;

    useEffect(() => {
        // Fetch user ID from the API
        const fetchUserId = async () => {
            try {
                const response = await axios.get("/api/get-user-id");
                setUserId(response.data.userId);
                console.log("User ID:", response.data.userId);
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };
        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchWorkouts = async () => {
                try {
                    const response = await axios.get(`/api/get-workouts`, {
                        params: { userId, date },
                    });
                    if (response.data) {
                        setWorkouts(response.data);
                        setErrorStatus(null);
                        console.log("Workouts:", response.data);
                    } else {
                        setWorkouts(null);
                        console.log(`No workouts found for date: ${date}`);
                    }
                } catch (error: any) {
                    if (error.response && error.response.status === 404) {
                        setWorkouts(null);
                        console.log(`No workouts found for date: ${date}`);
                    } else {
                        console.error("Error fetching workouts:", error);
                        setErrorStatus(error.response ? error.response.status : 500);
                    }
                }
            };
            fetchWorkouts();
        }
    }, [userId, date]);

    useEffect(() => {
        if (userId) {
            const fetchWeeklyWorkouts = async () => {
                const dates = getWeekDates(new Date(date));
                const workoutPromises = dates.map(async date => {
                    try {
                        const response = await axios.get(`/api/get-workouts`, { 
                            params: {userId, date} 
                        });
                        if (response.data) {
                            console.log(`Workouts for date ${date}:`, response.data);
                            return response.data;
                        } else {
                            console.log(`No workouts found for date: ${date}`);
                            return null;
                        }
                    } catch (error: any) {
                        if (error.response && error.response.status === 404) {
                            console.log(`No workouts found for date: ${date}`);
                            return null;
                        } else {
                            console.error(`Error fetching workouts for date ${date}:`, error);
                            return null;
                        }
                    }
                });

                try {
                    const workoutsData = await Promise.all(workoutPromises);
                    const validWorkouts = workoutsData.filter(data => data !== null);
                    setWeeklyWorkouts(validWorkouts);
                    setWeekRange(`${dates[0]} to ${dates[6]}`);
                    console.log("Weekly Workouts:", validWorkouts);

                    const weeklyCalories = calculateTotalCalories(validWorkouts);
                    setWeeklyTotalCalories(weeklyCalories);

                    const monthlyCalories = calculateMonthlyCalories(validWorkouts);
                    setMonthlyTotalCalories(monthlyCalories);

                    const dailyCalories = calculateDailyCalories(validWorkouts);
                    setDailyTotalCalories(dailyCalories);

                } catch (error) {
                    console.error("Error fetching weekly workouts:", error);
                }
            };
            fetchWeeklyWorkouts();
        }
    }, [userId, date]);

    const getWeekDates = (currentDate: Date) => {
        const weekDates = [];
        const dayOfWeek = currentDate.getUTCDay();
        const sunday = new Date(currentDate);
        sunday.setUTCDate(currentDate.getUTCDate() - dayOfWeek);
        for (let i = 0; i < 7; i++) {
            const date = new Date(sunday);
            date.setUTCDate(sunday.getUTCDate() + i);
            weekDates.push(date.toISOString().split('T')[0]);
        }
        return weekDates;
    };

    const calculateTotalCalories = (workoutsData: WorkoutsData[]) => {
        return workoutsData.reduce((total, day) => {
            return total + (day.workouts ? day.workouts.reduce((workoutTotal, item) => workoutTotal + item.caloriesBurned, 0) : 0);
        }, 0);
    };

    const calculateMonthlyCalories = (workoutsData: WorkoutsData[]) => {
        // Implement monthly total calories calculation based on the workoutsData
        // This is a placeholder function. Actual implementation may vary.
        return calculateTotalCalories(workoutsData) * 4; // Simplified example for demo
    };

    const calculateDailyCalories = (workoutsData: WorkoutsData[]) => {
        // Implement daily total calories calculation based on the workoutsData
        // This is a placeholder function. Actual implementation may vary.
        return calculateTotalCalories(workoutsData) / 7; // Simplified example for demo
    };

    return (
        <div>
            <TopCalendar onDateSelect={(date) => handleDateSelect(date, setDate)} />
            <WorkoutDietLink
                workoutLink="/summary/workout"
                dietLink="/summary/diet"
                workoutText="Workout"
                dietText="Diet"
                workoutTextColor="text-black"
                dietTextColor="text-gray-300"
            />
            <div className="text-center">
                {/* <ScoreCircleBarWrapper score={score} percent={percent} /> */}
                <AverageCalorieBanner title="Average Calorie Burned from" range={weekRange} />
                <div className="text-center">
                    <BarGraph
                        label="Monthly total"
                        value={monthlyTotalCalories}
                        maxValue={maxCalories}
                    />
                    <BarGraph
                        label="Weekly total"
                        value={weeklyTotalCalories}
                        maxValue={maxCalories}
                    />
                    <BarGraph
                        label="Daily total"
                        value={dailyTotalCalories}
                        maxValue={maxCalories}
                    />
                </div>
            </div>
        </div>
    );
}
