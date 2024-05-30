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

const mockWorkoutsData: WorkoutsData = {
    userId: "mockUserId",
    workouts: [
        {
            date: "2024-05-27",
            workoutDetail: [
                { name: "Running", calories: 300, unit: "km", quantity: 5, achieved: true },
                { name: "Cycling", calories: 200, unit: "km", quantity: 10, achieved: true },
            ],
        },
        {
            date: "2024-05-28",
            workoutDetail: [
                { name: "Swimming", calories: 400, unit: "laps", quantity: 20, achieved: true },
            ],
        },
        {
            date: "2024-05-29",
            workoutDetail: [
                { name: "Running", calories: 250, unit: "km", quantity: 4, achieved: true },
                { name: "Cycling", calories: 180, unit: "km", quantity: 8, achieved: true },
            ],
        },
        {
            date: "2024-05-30",
            workoutDetail: [
                { name: "Yoga", calories: 150, unit: "hour", quantity: 1, achieved: true },
            ],
        },
        {
            date: "2024-05-31",
            workoutDetail: [
                { name: "Running", calories: 350, unit: "km", quantity: 6, achieved: true },
            ],
        },
        {
            date: "2024-06-01",
            workoutDetail: [
                { name: "Cycling", calories: 220, unit: "km", quantity: 11, achieved: true },
                { name: "Swimming", calories: 300, unit: "laps", quantity: 15, achieved: true },
            ],
        },
        {
            date: "2024-06-02",
            workoutDetail: [
                { name: "Running", calories: 280, unit: "km", quantity: 5, achieved: true },
                { name: "Cycling", calories: 240, unit: "km", quantity: 12, achieved: true },
            ],
        },
    ],
};

export default function WorkoutSummary() {
    const [workouts, setWorkouts] = useState<WorkoutsData | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [errorStatus, setErrorStatus] = useState<number | null>(null); 
    const [weeklyWorkouts, setWeeklyWorkouts] = useState<WorkoutType[]>([]);
    const [weekRange, setWeekRange] = useState<string>("");
    const [monthlyAverageCalories, setMonthlyAverageCalories] = useState<number>(0); 
    const [weeklyAverageCalories, setWeeklyAverageCalories] = useState<number>(0); 
    const [dailyAverageCalories, setDailyAverageCalories] = useState<number>(0); 
    const [totalCalories, setTotalCalories] = useState<number>(0);
    const maxCalories = 2000;

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
        if (userId) {
            // const fetchWorkouts = async () => {
            //     try {
            //         const response = await axios.get(`/api/get-workouts`, {
            //             params: { userId, date },
            //         });
            //         if (response.data) {
            //             setWorkouts(response.data);
            //             setErrorStatus(null);
            //             console.log("Workouts:", response.data);

            //             const weeklyWorkoutsData = getWeeklyWorkouts(response.data.workouts, date);
            //             const weekDates = getWeekDates(new Date(date));
            //             setWeekRange(`${weekDates[0]} to ${weekDates[6]}`);

            //             const weeklyCalories = calculateTotalCalories(weeklyWorkoutsData);
            //             setWeeklyAverageCalories(Math.round(weeklyCalories / 7)); 

            //             const monthlyAverageCalories = calculateMonthlyAverageCalories(response.data.workouts, date);
            //             setMonthlyAverageCalories(monthlyAverageCalories);

            //             const dailyCalories = calculateDailyCalories(response.data.workouts, date);
            //             setDailyAverageCalories(Math.round(dailyCalories / 1)); 

            //             const totalCalories = calculateTotalCalories(response.data.workouts);
            //             setTotalCalories(totalCalories);

            //         } else {
            //             setWorkouts(null);
            //             console.log(`No workouts found for user: ${userId}`);
            //             return null;
            //         }
            //     } catch (error: any) {
            //         if (error.response && error.response.status === 404) {
            //             setWorkouts(null);
            //             console.log(`No workouts found for user: ${userId}`);
            //             return null;
            //         } else {
            //             console.error("Error fetching workouts:", error);
            //             setErrorStatus(error.response ? error.response.status : 500);
            //         }
            //     }
            // };
            // fetchWorkouts();

            // use mock data for now
            setWorkouts(mockWorkoutsData);
            setErrorStatus(null);
            console.log("Workouts:", mockWorkoutsData);

            const weeklyWorkoutsData = getWeeklyWorkouts(mockWorkoutsData.workouts, date);
            const weekDates = getWeekDates(new Date(date));
            setWeekRange(`${weekDates[0]} to ${weekDates[6]}`);

            const weeklyCalories = calculateTotalCalories(weeklyWorkoutsData);
            setWeeklyAverageCalories(Math.round(weeklyCalories / 7)); 

            const monthlyAverageCalories = calculateMonthlyAverageCalories(mockWorkoutsData.workouts, date);
            setMonthlyAverageCalories(monthlyAverageCalories);

            const dailyCalories = calculateDailyCalories(mockWorkoutsData.workouts, date);
            setDailyAverageCalories(Math.round(dailyCalories / 1)); 

            const totalCalories = calculateTotalCalories(mockWorkoutsData.workouts);
            setTotalCalories(totalCalories);
        }
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

    const calculateMonthlyAverageCalories = (workouts: WorkoutType[], currentDate: string) => {
        const currentMonth = new Date(currentDate).getMonth();
        const monthlyWorkouts = workouts.filter(workout => new Date(workout.date).getMonth() === currentMonth);
        const totalCalories = calculateTotalCalories(monthlyWorkouts);
        const daysInMonth = new Date(new Date(currentDate).getFullYear(), currentMonth + 1, 0).getDate();
        return Math.round(totalCalories / daysInMonth);
    };

    const calculateDailyCalories = (workouts: WorkoutType[], currentDate: string) => {
        const dailyWorkouts = workouts.filter(workout => workout.date === currentDate);
        return calculateTotalCalories(dailyWorkouts);
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
