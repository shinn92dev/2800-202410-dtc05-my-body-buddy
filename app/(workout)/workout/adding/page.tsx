import WorkoutAddingWrapper from "@/components/workout_adding/WorkoutAddingWrapper";
import authenticateUser from "@/app/_helper/authenticateUser";

export const metadata = {
    title: "Workout Adding",
};

// Rendering client components with server components
export default async function WorkoutAddingPage() {
    await authenticateUser();
    return <WorkoutAddingWrapper />;
}
