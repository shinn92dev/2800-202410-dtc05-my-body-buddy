"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import AiLines from '@/components/global/AiLines';
import LoadingAnimation from "@/components/global/LoadingAnimation";
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
    const [isLoading, setIsLoading] = useState(false); // State to track if the AI is generating suggestions
    const [selectedItems, setSelectedItems] = useState<any[]>([]); // State to store selected workout items
    const [selectedTags, setSelectedTags] = useState<string[]>([]); // State to store selected tags
    const [generatedItems, setGeneratedItems] = useState<any[]>([]); // State to store generated items from AI response
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to store error messages
    const router = useRouter();

    // Function to update states and mark suggestions as generated
    const setGeneratedTrue = (selectedItems: any[], selectedTags: string[]) => {
        setSelectedItems(selectedItems);
        setSelectedTags(selectedTags);
        setGenerated(true);
        setIsLoading(true);
    };

    const handleAdoptAlternative = () => {
        router.push("/workout");
    };

    const handleRegenerateAlternative = async () => {
        setIsLoading(true);
        setGeneratedItems([]);
        setErrorMessage(null);

        const prompt = `Please consider alternative options for the workout menu below, taking into account the reasons provided.\n\nWorkout menu to replace:\n${selectedItems.map(item => `・${item.title} - ${item.quantity} ${item.unit} (${Math.round(item.kcalPerUnit * item.quantity * 10) / 10} kcal)`).join('\n')}\n\nReasons why I want to replace:\n・${selectedTags.join('\n・')}\n\nThe alternative must include the same number of items and must have the same estimated calorie consumption in total.\nEach item must be output in the following format:\n・[item_name] - [quantity] [unit] ([estimated_calorie_consume] kcal)`;

        try {
            const response = await fetch('/api/generate-alternative', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate alternative');
            }

            const data = await response.json();
            handleGenerateItems(data.result);
        } catch (error) {
            console.error('Error generating alternative:', error);
        }

        setIsLoading(false);
    };

    // Function to parse AI response and update generatedItems
    const handleGenerateItems = (response: string) => {
        try {
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
            if (items.length > 0) {
                setGeneratedItems(items);
            } else {
                setErrorMessage("Generated result could not be properly formatted. Please try again.");
            }
        } catch (error) {
            setErrorMessage("An error occurred while processing the response. Please try again.");
        }

        setIsLoading(false);
    };

    return (
        <div>
            <AiLines messageTitle={initialMessageTitle} messageBody={initialMessageBody} />
            <WorkoutAiSupportInput onGenerateAlternative={setGeneratedTrue} onGenerateItems={handleGenerateItems} />
            {generated && <AiLines messageBody={messageBodyWhenButtonClicked} />}
            {isLoading && <LoadingAnimation />}
            {generatedItems.length > 0 ? (
                <div>
                    <div className="flex flex-col items-start p-2">
                        <div className="flex items-start w-full">
                            <div className="mr-2">
                                <div style={{width: '50px', height: '50px', backgroundColor: 'transparent'}}></div>
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
                                            <h2 className="font-bold">{(item.kcalPerUnit * item.quantity).toFixed(0)} kcal</h2>
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
                                <div className="flex justify-center pt-2">
                                    <button
                                        onClick={handleRegenerateAlternative}
                                        className="px-4 py-2 bg-gray-500 text-white rounded-full"
                                    >
                                        ↻ Regenerate
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                errorMessage && (
                    <div>
                        <div className="flex flex-col items-start p-2">
                            <div className="flex items-start">
                                <div className="mr-2">
                                    <Image src="/my_boddy_buddy_support_ai_logo.png" alt="support AI logo" width={50} height={50}/>
                                </div>
                                <div className="relative speech-bubble-ai bg-beige p-4 rounded-lg">
                                    <div>
                                        <p>{errorMessage}</p>
                                    </div>
                                    <div className="flex justify-center pt-2">
                                        <button
                                            onClick={handleRegenerateAlternative}
                                            className="px-4 py-2 bg-gray-500 text-white rounded-full"
                                        >
                                            ↻ Regenerate
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
