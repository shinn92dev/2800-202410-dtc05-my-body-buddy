import WorkoutAiSupportWrapper from "@/components/workout_ai_support/WorkoutAiSupportWrapper";
import authenticateUser from "@/app/_helper/authenticateUser";

export const metadata = {
    title: "Workout AI Support",
};

// Rendering client components with server components
export default async function WorkoutAiSupportPage() {
    await authenticateUser();
    return <WorkoutAiSupportWrapper />;
}
