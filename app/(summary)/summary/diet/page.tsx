import React from "react";
import TopCalendar from "@/components/top_calendar/TopCalendar";
import ScoreCircleBarWrapper from "@/components/summary_score_circle_bar/ScoreCircleBarWrapper";
import BarGraph from "@/components/global/BarGraph";

export const metadata = {
    title: "Diet Summary",
};

export default function DietSummary() {
    const score = 80; // Replace with a logic to get the score
    const percent = 80; // Replace with a logic to get the percentage
    const monthlyTotalCalories = 5000; // Replace with a logic to get the monthly total calories
    const weeklyTotalCalories = 1200; // Replace with a logic to get the weekly total calories
    const dailyTotalCalories = 200; // Replace with a logic to get the daily total calories
    const maxCalories = 10000;
    return (
        <div>
            <TopCalendar/>
            <div className="text-center">
                <ScoreCircleBarWrapper score={score} percent={percent} />
                <div className='text-xl font-semibold p-4'>Calorie Took</div>
                <BarGraph label="Monthly total" value={monthlyTotalCalories} maxValue={maxCalories}/>
                <BarGraph label="Weekly total" value={weeklyTotalCalories} maxValue={maxCalories}/>
                <BarGraph label="Daily total" value={dailyTotalCalories} maxValue={maxCalories}/>
            </div>
        </div>
    );
}

