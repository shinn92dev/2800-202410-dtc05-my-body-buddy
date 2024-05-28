import WorkoutSummaryWrapper from "@/components/workout_summary/WorkoutSummaryWrapper";
import authenticateUser from "@/app/_helper/authenticateUser";

export const metadata = {
    title: "Workout Summary",
};

export default function WorkoutSummary() {
    authenticateUser();
    return (
        <div className="flex flex-col w-full">
            <WorkoutSummaryWrapper />
        </div>
    );
}
