"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AiLines from "@/components/global/AiLines";
import WorkoutAiSupportInput from "@/components/workout_ai_support/WorkoutAiSupportInput";
import "@/components/global/AiLines.scss";
import "@/components/workout_ai_support/WorkoutAiSupportInput.scss";

// Initial messages
const initialMessageTitle = "Hi! I'm BODY BUDDY AI.";
const initialMessageBody = "I'll suggest alternatives of your menu.\n\nPlease tell me which items you would like to exchange and why in the form below.";

const messageBodyWhenButtonClicked = "Generating alternative exercise menus based on your inputs...";

const generatedMessageBody = "Here's an alternative indoor exercise that approximates the calorie burn of cycling 4 km (which typically burns around 115 kcal):\n" +
    "\n" +
    "Indoor Exercise Option: Jump Rope\n" +
    "\n" +
    "Exercise: Jump Rope\nDuration: 10-15 minutes\nEstimated Calorie Burn: Approximately 115 kcal\n" +
    "\n" +
    "Description: \n" +
    "Jumping rope is an effective, equipment-minimal exercise that can be done indoors. It improves your cardiovascular fitness, coordination, and agility.\n" +
    "\n" +
    "How to Do It:\n" +
    "Find a space with a high enough ceiling or an open area to ensure the rope can swing freely.\n" +
    "Stand with your feet slightly apart, and hold the ends of the rope at hip level.\n" +
    "Rotate your wrists to swing the rope over your head and jump over it with both feet as it reaches the floor.\n" +
    "Maintain a steady pace, and try to jump continuously for 10-15 minutes.\n" +
    "\n" +
    "Benefits:\n" +
    "Provides a full-body workout.\n" +
    "Enhances cardiovascular fitness.\n" +
    "Burns a significant number of calories in a short period.\n" +
    "\n" +
    "Note: \n" +
    "The actual calories burned can vary based on your weight, metabolism, and the intensity of jumping. You might need to adjust the duration slightly to match the exact calorie burn of cycling 4 km.\n" +
    "\n" +
    "This option should serve as a good alternative to cycling if you're looking to stay indoors and don't have specific equipment for cycling.\n";

// AiSupportWrapper component
export default function AiSupportWrapper() {
    const [generated, setGenerated] = useState(false); // State to track if alternative suggestions are generated
    const [selectedItems, setSelectedItems] = useState<any[]>([]); // State to store selected workout items
    const [selectedTags, setSelectedTags] = useState<string[]>([]); // State to store selected tags

    // Function to update states and mark suggestions as generated
    const setGeneratedTrue = (selectedItems: any[], selectedTags: string[]) => {
        setSelectedItems(selectedItems);
        setSelectedTags(selectedTags);
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
