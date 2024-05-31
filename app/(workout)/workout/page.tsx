import WorkoutHomeWrapper from "@/components/workout_home/WorkoutHomeWrapper";
import authenticateUser from "@/app/_helper/authenticateUser";

export const metadata = {
    title: "Workout Home",
};

export default async function WorkoutPage() {
    await authenticateUser();
    return (
        <div className="flex flex-col w-full">
            <WorkoutHomeWrapper />
        </div>
    );
}
