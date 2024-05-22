import WorkoutHomeWrapper from "@/components/workout_home/WorkoutHomeWrapper";
import CalendarNavBar from "@/components/top_calendar/TopCalendar";

export const metadata = {
    title: "Workout Home",
};

// Rendering client components with server components
export default function WorkoutPage() {
    return (
        <div className="flex flex-col w-full">
            <CalendarNavBar />
            <WorkoutHomeWrapper />
        </div>
    );
}
