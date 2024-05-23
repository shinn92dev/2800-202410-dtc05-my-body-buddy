import WorkoutHomeWrapper from "@/components/workout_home/WorkoutHomeWrapper";
import TopCalendar from "@/components/top_calendar/TopCalendar";
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
    const data = await retrieveWorkout("johndoe123");
    console.log("!!!", data);
    console.log(filterWorkoutsByAchievement(new Date(), data?.workouts));
    return (
        <div className="flex flex-col w-full">
            <TopCalendar />
            <WorkoutHomeWrapper />
        </div>
    );
}
