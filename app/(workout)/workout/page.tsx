import WorkoutHomeWrapper from "@/components/workout_home/WorkoutHomeWrapper";

export const metadata = {
    title: "Workout Home",
};

// Rendering client components with server components
export default function WorkoutPage() {
    return <WorkoutHomeWrapper />;
}
