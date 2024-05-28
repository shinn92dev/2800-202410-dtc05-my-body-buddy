"use client";

import React, { useEffect, useState } from "react";
import TopCalendar from "@/components/global/TopCalendar";
import BarGraph from "@/components/global/BarGraph";
import WorkoutDietLink from "@/components/workout_diet_link/WorkoutDietLink";
import AverageCalorieBanner from "@/components/global/AverageCalorieBanner";
import axios from "axios";
import { handleDateSelect } from "@/app/_helper/handleDate"; 

type WorkoutDetailType = {
    name: string;
    calories: number;
    unit: string;
    quantity: number;
    achieved: boolean;
};

type WorkoutType = {
    date: string;
    workoutDetail: WorkoutDetailType[];
};

type WorkoutsData = {
    userId: string;
    workouts: WorkoutType[];
};

export default function WorkoutSummary() {
    const [workouts, setWorkouts] = useState<WorkoutsData | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [errorStatus, setErrorStatus] = useState<number | null>(null); 
    const [weeklyWorkouts, setWeeklyWorkouts] = useState<WorkoutType[]>([]);
    const [weekRange, setWeekRange] = useState<string>("");
    const [monthlyTotalCalories, setMonthlyTotalCalories] = useState<number>(0);
    const [weeklyTotalCalories, setWeeklyTotalCalories] = useState<number>(0);
    const [dailyTotalCalories, setDailyTotalCalories] = useState<number>(0);
    const [totalCalories, setTotalCalories] = useState<number>(0);
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

                        const weeklyWorkoutsData = getWeeklyWorkouts(response.data.workouts, date);
                        const weekDates = getWeekDates(new Date(date));
                        setWeekRange(`${weekDates[0]} to ${weekDates[6]}`);

                        const weeklyCalories = calculateTotalCalories(weeklyWorkoutsData);
                        setWeeklyTotalCalories(weeklyCalories);

                        const monthlyCalories = calculateMonthlyCalories(response.data.workouts, date);
                        setMonthlyTotalCalories(monthlyCalories);

                        const dailyCalories = calculateDailyCalories(response.data.workouts, date);
                        setDailyTotalCalories(dailyCalories);

                        const totalCalories = calculateTotalCalories(response.data.workouts);
                        setTotalCalories(totalCalories);

                    } else {
                        setWorkouts(null);
                        // setErrorStatus(404);
                        console.log(`No workouts found for user: ${userId}`);
                        return null;
                    }
                } catch (error: any) {
                    if (error.response && error.response.status === 404) {
                        setWorkouts(null);
                        // setErrorStatus(404);
                        // console.log(`No workouts found for user: ${userId}`);
                        return null;
                    } else {
                        console.error("Error fetching workouts:", error);
                        setErrorStatus(error.response ? error.response.status : 500);
                    }
                }
            };
            fetchWorkouts();
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

    const getWeeklyWorkouts = (workouts: WorkoutType[], currentDate: string) => {
        const weekDates = getWeekDates(new Date(currentDate));
        return workouts.filter(workout => weekDates.includes(workout.date));
    };

    const calculateTotalCalories = (workouts: WorkoutType[]) => {
        return workouts.reduce((total, day) => {
            return total + day.workoutDetail.reduce((workoutTotal, item) => workoutTotal + item.calories, 0);
        }, 0);
    };

    const calculateMonthlyCalories = (workouts: WorkoutType[], currentDate: string) => {
        const currentMonth = new Date(currentDate).getMonth();
        const monthlyWorkouts = workouts.filter(workout => new Date(workout.date).getMonth() === currentMonth);
        return calculateTotalCalories(monthlyWorkouts);
    };

    const calculateDailyCalories = (workouts: WorkoutType[], currentDate: string) => {
        const dailyWorkouts = workouts.filter(workout => workout.date === currentDate);
        return calculateTotalCalories(dailyWorkouts);
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
                <AverageCalorieBanner title="Total calories you burned:" range={weekRange} />
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
            {errorStatus && <div className="text-red-500 text-center">Error fetching data: {errorStatus}</div>}
        </div>
    );
}
