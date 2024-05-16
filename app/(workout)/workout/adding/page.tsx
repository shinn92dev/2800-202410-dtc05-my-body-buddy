import WorkoutAddingWrapper from "@/components/workout_adding/WorkoutAddingWrapper";

export const metadata = {
    title: "Workout Adding",
};

// サーバーコンポーネントでクライアントコンポーネントをレンダリング
export default function WorkoutAddingPage() {
    return <WorkoutAddingWrapper />;
}
