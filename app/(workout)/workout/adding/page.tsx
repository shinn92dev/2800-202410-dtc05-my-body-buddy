import WorkoutAddingWrapper from "@/components/workout_adding/WorkoutAddingWrapper";

export const metadata = {
    title: "Workout Adding",
};

// Rendering client components with server components
export default function WorkoutAddingPage() {
    return <WorkoutAddingWrapper />;
}
