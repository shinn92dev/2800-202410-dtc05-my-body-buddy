import AiLines from "@/components/global/AiLines";
import WorkoutAiSupportInput from "@/components/workout_ai_support/WorkoutAiSupportInput";

export const metadata = {
    title: "Workout AI Support",
};

export default function AiSupport() {
    const initialMessageTitle = "Hi! I'm BODY BUDDY AI.";
    const initialMessageBody = "I'll suggest alternatives of your menu.\n\nPlease tell me which items you would like to exchange and why in the form below.";

    return (
        <div>
            <AiLines
                messageTitle={initialMessageTitle}
                messageBody={initialMessageBody}
            />
            <WorkoutAiSupportInput />
            {/* Other contents go here */}
        </div>
    );
}
