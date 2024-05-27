import WorkoutHomeWrapper from "@/components/workout_home/WorkoutHomeWrapper";

export const metadata = {
    title: "Workout Home",
};

export default function WorkoutPage() {
    return (
        <div className="flex flex-col w-full">
            <WorkoutHomeWrapper />
        </div>
    );
}
