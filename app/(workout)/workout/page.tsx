import WorkoutHomeWrapper from "@/components/workout_home/WorkoutHomeWrapper";
// import TopCalendar from "@/components/top_calendar/TopCalendar";
import { connectMongoDB } from "@/config/db";
import {
    saveNewUserWorkoutMongoDB,
    retrieveWorkout,
    filterWorkoutsByAchievement,
} from "@/app/_helper/workout";

export const metadata = {
    title: "Workout Home",
};

// Rendering client components with server components
export default async function WorkoutPage() {
    const data = await retrieveWorkout("john.doe");
    const filteredData = filterWorkoutsByAchievement(
        new Date("2024-05-22"),
        data?.workouts
    );
    const finalData = [...filteredData?.achieved, ...filteredData?.onGoing];

    console.log("OUTPUT FRsOM PAGE: ", finalData);
    const totalStringWorkoutData = JSON.stringify(finalData);
    const achievedStringData = JSON.stringify(filteredData?.achieved);
    // console.log(totalStringWorkoutData);
    const tempFn = (date: Date) => console.log(date);
    return (
        <div className="flex flex-col w-full">
            {/* <TopCalendar onDateSelect={tempFn} /> */}
            <WorkoutHomeWrapper
                totalWorkoutData={totalStringWorkoutData}
                achievedWorkoutData={achievedStringData}
            />
        </div>
    );
}
