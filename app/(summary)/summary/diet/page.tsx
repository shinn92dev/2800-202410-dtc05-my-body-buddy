import React from "react";
import TopCalendar from "@/components/top_calendar/TopCalendar";
import ScoreCircleBarWrapper from "@/components/summary_score_circle_bar/ScoreCircleBarWrapper";
import BarGraph from "@/components/global/BarGraph";
import WorkoutDietLink from "@/components/workout_diet_link/WorkoutDietLink";

export const metadata = {
    title: "Diet Summary",
};

export default function DietSummary() {
    const score = 80; // Replace with a logic to get the score
    const percent = 80; // Replace with a logic to get the percentage
    const dailyTotalCalories = 4000; // Replace with a logic to get the monthly total calories
    const breakfastTotalCalories = 1000; // Replace with a logic to get the weekly total calories
    const lunchTotalCalories = 1000; // Replace with a logic to get the lunch total calories
    const dinnerTotalCalories = 1500; // Replace with a logic to get the dinner total calories
    const snackTotalCalories = 500; // Replace with a logic to get the snack total calories
    const maxCalories = 5000;
    return (
        <div>
            <TopCalendar/>
            <WorkoutDietLink
                workoutLink="/summary/workout"
                dietLink="/summary/diet"
                workoutText="Workout"
                dietText="Diet"
            />
            <div className="text-center">
                <ScoreCircleBarWrapper score={score} percent={percent} />
                <div className='text-xl font-semibold p-4'>Calorie Took</div>
                <BarGraph label="Daily total" value={dailyTotalCalories} maxValue={maxCalories}/>
                <BarGraph label="Breakfast total" value={breakfastTotalCalories} maxValue={maxCalories}/>
                <BarGraph label="Lunch total" value={lunchTotalCalories} maxValue={maxCalories}/>
                <BarGraph label="Dinner total" value={dinnerTotalCalories} maxValue={maxCalories}/>
                <BarGraph label="Snack total" value={snackTotalCalories} maxValue={maxCalories}/>
            </div>
        </div>
    );
}
