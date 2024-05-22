"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AiLines from "@/components/global/AiLines";
import WorkoutAiSupportInput from "@/components/workout_ai_support/WorkoutAiSupportInput";
import "@/components/global/AiLines.scss";
import "@/components/workout_ai_support/WorkoutAiSupportInput.scss";

const initialMessageTitle = "Hi! I'm BODY BUDDY AI.";
const initialMessageBody = "I'll suggest alternatives of your menu.\n\nPlease tell me which items you would like to exchange and why in the form below.";

const messageBodyWhenButtonClicked = "Generating alternative exercise menus based on your inputs...";

// AiSupportWrapper component
export default function AiSupportWrapper() {
    const [generated, setGenerated] = useState(false);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [generatedMessageBody, setGeneratedMessageBody] = useState<string>("");

    // Function to update states and mark suggestions as generated
    const setGeneratedTrue = (selectedItems: any[], selectedTags: string[], result: string) => {
        setSelectedItems(selectedItems);
        setSelectedTags(selectedTags);
        setGeneratedMessageBody(result);
        setGenerated(true);
    };

    return (
        <div>
            <AiLines messageTitle={initialMessageTitle} messageBody={initialMessageBody} />
            <WorkoutAiSupportInput onGenerateAlternative={setGeneratedTrue} />
            {generated && <AiLines messageBody={messageBodyWhenButtonClicked} />}
            {generated && <AiLines messageBody={generatedMessageBody} />}
        </div>
    );
}
