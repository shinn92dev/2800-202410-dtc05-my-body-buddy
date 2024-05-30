
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
    date: string;
};

type WorkoutsData = {
    userId: string;
    achieved: WorkoutDetailType[];
    onGoing: WorkoutDetailType[];
};

export default function WorkoutSummaryWrapper() {
    const [workoutDetails, setWorkoutDetails] = useState<WorkoutDetailType[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [errorStatus, setErrorStatus] = useState<number | null>(null);
    const [weeklyWorkouts, setWeeklyWorkouts] = useState<WorkoutDetailType[]>([]);
    const [weekRange, setWeekRange] = useState<string>("");
    const [monthlyAverageCalories, setMonthlyAverageCalories] = useState<number>(0);
    const [weeklyAverageCalories, setWeeklyAverageCalories] = useState<number>(0);
    const [dailyAverageCalories, setDailyAverageCalories] = useState<number>(0);
    const [totalCalories, setTotalCalories] = useState<number>(0);
    const maxCalories = 500;

    useEffect(() => {
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
        const fetchWorkouts = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`/api/get-workout`, {
                        params: { userId, date },
                    });
                    if (response.data) {
                        const { achieved, onGoing } = response.data;
                        const combinedWorkouts = [...achieved, ...onGoing];
                        setWorkoutDetails(combinedWorkouts);
                        setErrorStatus(null);
                        console.log("Workouts:", combinedWorkouts);

                        const weeklyWorkoutsData = getWeeklyWorkouts(combinedWorkouts, date);
                        const weekDates = getWeekDates(new Date(date));
                        setWeekRange(`${weekDates[0]} to ${weekDates[6]}`);
                        console.log("Weekly workouts data:", weeklyWorkoutsData);
                        console.log("Week range:", weekDates);

                        const weeklyCalories = calculateTotalCalories(weeklyWorkoutsData);
                        setWeeklyAverageCalories(Math.round(weeklyCalories / 7));
                        console.log("Weekly calories:", weeklyCalories);
                        console.log("Weekly average calories:", Math.round(weeklyCalories / 7));

                        const monthlyAverageCalories = calculateMonthlyAverageCalories(combinedWorkouts, date);
                        setMonthlyAverageCalories(monthlyAverageCalories);
                        console.log("Monthly average calories:", monthlyAverageCalories);

                        const dailyCalories = calculateDailyCalories(combinedWorkouts, date);
                        setDailyAverageCalories(Math.round(dailyCalories / 1));
                        console.log("Daily calories:", dailyCalories);
                        console.log("Daily average calories:", Math.round(dailyCalories / 1));

                        const totalCalories = calculateTotalCalories(combinedWorkouts);
                        setTotalCalories(totalCalories);
                        console.log("Total calories:", totalCalories);

                    } else {
                        setWorkoutDetails([]);
                        console.log(`No workouts found for user: ${userId}`);
                        return null;
                    }
                } catch (error: any) {
                    if (error.response && error.response.status === 404) {
                        setWorkoutDetails([]);
                        console.log(`No workouts found for user: ${userId}`);
                        return null;
                    } else {
                        console.error("Error fetching workouts:", error);
                        setErrorStatus(error.response ? error.response.status : 500);
                    }
                }
            }
        };
        fetchWorkouts();
    }, [userId, date]);

    const getWeekDates = (currentDate: Date) => {
        const weekDates = [];
        const dayOfWeek = (currentDate.getUTCDay() + 6) % 7;
        const monday = new Date(currentDate);
        monday.setUTCDate(currentDate.getUTCDate() - dayOfWeek);
        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setUTCDate(monday.getUTCDate() + i);
            weekDates.push(date.toISOString().split('T')[0]);
        }
        console.log("Week dates:", weekDates); // Add console log
        return weekDates;
    };

    const getWeeklyWorkouts = (workouts: WorkoutDetailType[], currentDate: string) => {
        const weekDates = getWeekDates(new Date(currentDate));
        // Filter workouts based on weekDates
        const weeklyWorkouts = workouts.filter(workout => weekDates.includes(workout.date));
        console.log("Filtered weekly workouts:", weeklyWorkouts); // Add console log
        return weeklyWorkouts;
    };

    const calculateTotalCalories = (workouts: WorkoutDetailType[]) => {
        const totalCalories = workouts.reduce((total, item) => {
            return total + item.calories;
        }, 0);
        console.log("Total calories calculation:", totalCalories); // Add console log
        return totalCalories;
    };

    const calculateMonthlyAverageCalories = (workouts: WorkoutDetailType[], currentDate: string) => {
        const currentMonth = new Date(currentDate).getMonth();
        const monthlyWorkouts = workouts.filter(workout => new Date(workout.date).getMonth() === currentMonth);
        const totalCalories = calculateTotalCalories(monthlyWorkouts);
        const daysInMonth = new Date(new Date(currentDate).getFullYear(), currentMonth + 1, 0).getDate();
        const monthlyAverageCalories = Math.round(totalCalories / daysInMonth);
        console.log("Monthly total calories:", totalCalories); // Add console log
        console.log("Monthly average calories calculation:", monthlyAverageCalories); // Add console log
        return monthlyAverageCalories;
    };

    const calculateDailyCalories = (workouts: WorkoutDetailType[], currentDate: string) => {
        const dailyWorkouts = workouts.filter(workout => workout.date === currentDate);
        const dailyCalories = calculateTotalCalories(dailyWorkouts);
        console.log("Daily total calories:", dailyCalories); // Add console log
        return dailyCalories;
    };

    const getMonthName = (monthIndex: number) => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthNames[monthIndex];
    };

    const selectedMonth = new Date(date).getMonth();
    const selectedMonthName = getMonthName(selectedMonth);

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
                workoutUnderline="underline decoration-black"
                dietUnderline="underline decoration-gray-300"
            />
            <div className="text-center">
                <AverageCalorieBanner title="Average calories burned from:" range={weekRange} />
                <BarGraph
                    label={`Monthly Average (${selectedMonthName})`}
                    value={monthlyAverageCalories}
                    maxValue={maxCalories}
                />
                <BarGraph
                    label="Weekly Average"
                    value={weeklyAverageCalories}
                    maxValue={maxCalories}
                />
                <BarGraph
                    label="Daily Average"
                    value={dailyAverageCalories}
                    maxValue={maxCalories}
                />
            </div>
            {errorStatus && <div className="text-red-500 text-center">Error fetching data: {errorStatus}</div>}
        </div>
    );
}
