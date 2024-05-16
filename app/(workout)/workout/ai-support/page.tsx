import AiLines from "../../../../components/global/AiLines";

export const metadata = {
    title: "Workout AI Support",
};

export default function AiSupport() {
    return (
        <div>
            <AiLines
                messageTitle={"Hi! I'm BODY BUDDY AI."}
                messageBody={"I'll suggest alternatives of your menu.\n\nPlease tell me which items you would like to exchange and why in the form below."}
            />
            {/* Other contents go here */}
        </div>
    );
}
