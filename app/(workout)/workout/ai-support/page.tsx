import AiSupportWrapper from "@/components/workout_ai_support/AiSupportWrapper";

export const metadata = {
    title: "Workout AI Support",
};

// サーバーコンポーネントでクライアントコンポーネントをレンダリング
export default function AiSupportPage() {
    return <AiSupportWrapper />;
}
