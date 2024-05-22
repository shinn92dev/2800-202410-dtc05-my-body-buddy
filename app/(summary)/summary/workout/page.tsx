import React from "react";
import TopCalendar from "@/components/top_calendar/TopCalendar";
import ScoreCircleBarWrapper from "@/components/summary_score_circle_bar/ScoreCircleBarWrapper";
import BarGraph from "@/components/global/BarGraph";
import WorkoutDietLink from "@/components/workout_diet_link/WorkoutDietLink";

export const metadata = {
    title: "Workout Summary",
};

const WorkoutSummary: React.FC = () => {
    const score = 80; // Replace with logic to get the score
    const percent = 80; // Replace with logic to get the percentage
    const monthlyTotalCalories = 7120; // Replace with logic to get monthly total calories
    const weeklyTotalCalories = 1550; // Replace with logic to get weekly total calories
    const dailyTotalCalories = 255; // Replace with logic to get daily total calories
    const maxCalories = 10000; // Define max calories

    return (
        <div>
            <TopCalendar />
            <WorkoutDietLink
                workoutLink="/summary/workout"
                dietLink="/summary/diet"
                workoutText="Workout"
                dietText="Diet"
            />
            <div className="text-center">
                <ScoreCircleBarWrapper score={score} percent={percent} />
                <div className="text-xl font-semibold p-4">Calorie Burned</div>
                <BarGraph label="Monthly total" value={monthlyTotalCalories} maxValue={maxCalories} />
                <BarGraph label="Weekly total" value={weeklyTotalCalories} maxValue={maxCalories} />
                <BarGraph label="Daily total" value={dailyTotalCalories} maxValue={maxCalories} />
            </div>
        </div>
    );
};

export default WorkoutSummary;