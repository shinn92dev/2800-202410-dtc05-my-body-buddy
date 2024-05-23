"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import AiLines from '@/components/global/AiLines';
import WorkoutAiSupportInput from '@/components/workout_ai_support/WorkoutAiSupportInput';
import "@/components/global/AiLines.scss";
import "@/components/workout_ai_support/WorkoutAiSupportInput.scss";
import Image from "next/image";

// Initial messages
const initialMessageTitle = "Hi! I'm BODY BUDDY AI.";
const initialMessageBody = "I'll suggest alternatives of your menu.\n\nPlease tell me which items you would like to exchange and why in the form below.";

const messageBodyWhenButtonClicked = "Generating alternative exercise menus based on your inputs...";

// AiSupportWrapper component
export default function AiSupportWrapper() {
    const [generated, setGenerated] = useState(false); // State to track if alternative suggestions are generated
    const [selectedItems, setSelectedItems] = useState<any[]>([]); // State to store selected workout items
    const [selectedTags, setSelectedTags] = useState<string[]>([]); // State to store selected tags
    const [generatedItems, setGeneratedItems] = useState<any[]>([]); // State to store generated items from AI response
    const router = useRouter();

    // Function to update states and mark suggestions as generated
    const setGeneratedTrue = (selectedItems: any[], selectedTags: string[]) => {
        setSelectedItems(selectedItems);
        setSelectedTags(selectedTags);
        setGenerated(true);
    };

    const handleAdoptAlternative = () => {
        router.push("/workout");
    };

    // Function to parse AI response and update generatedItems
    const handleGenerateItems = (response: string) => {
        const regex = /・(.+?)\s*-\s*(\d+)\s*(\w+)\s*\((\d+)\s*kcal\)/g;
        const items = [];
        let match;
        while ((match = regex.exec(response)) !== null) {
            const title = match[1];
            const quantity = parseInt(match[2], 10);
            const unit = match[3];
            const kcalPerUnit = parseFloat(match[4]) / quantity;
            items.push({ title, quantity, unit, kcalPerUnit });
        }
        setGeneratedItems(items);
        console.log(items); // Display generated items in the console
    };

    return (
        <div>
            <AiLines messageTitle={initialMessageTitle} messageBody={initialMessageBody} />
            <WorkoutAiSupportInput onGenerateAlternative={setGeneratedTrue} onGenerateItems={handleGenerateItems} />
            {generated && <AiLines messageBody={messageBodyWhenButtonClicked} />}
            {generatedItems.length > 0 && (
                <div>
                    <div className="flex flex-col items-start p-2 w-full">
                        <div className="flex items-start w-full">
                            <div className="mr-2">
                                <Image src="/my_boddy_buddy_support_ai_logo.jpg" alt="support AI logo" width={51} height={51} />
                            </div>
                            <div className="relative speech-bubble-ai bg-beige p-4 rounded-lg w-full">
                                <p>Generated Items:</p>
                                {generatedItems.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between py-1">
                                        <div className="flex items-center">
                                            <span className="mr-2">・</span>
                                            <div>
                                                <h2 className="font-bold">{item.title}</h2>
                                                <h3 className="text-sm text-gray-500">{item.quantity} {item.unit}</h3>
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="font-bold">{(item.kcalPerUnit * item.quantity).toFixed(1)} kcal</h2>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex justify-center pt-2">
                                    <button
                                        onClick={handleAdoptAlternative}
                                        className="px-4 py-2 bg-dark-blue text-white rounded-full"
                                    >
                                        Adopt Alternative
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
