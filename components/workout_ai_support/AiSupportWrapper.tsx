"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AiLines from "@/components/global/AiLines";
import "@/components/global/AiLines.scss";
import "@/components/workout_ai_support/WorkoutAiSupportInput.scss";

// initial messages
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

// AiSupportWrapper
export default function AiSupportWrapper() {
    const [generated, setGenerated] = useState(false);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

// WorkoutAiSupportInput
type WorkoutAiSupportInputProps = {
    onGenerateAlternative: (selectedItems: any[], selectedTags: string[]) => void;
};

const workoutMenuItems = [
    { "title": "Crunches", "quantity": 50, "unit": "reps", "kcalPerUnit": 4.92 },
    { "title": "Cycling", "quantity": 4, "unit": "km", "kcalPerUnit": 30 }
];

const defaultTags = [
    "Looks too hard",
    "Getting bored",
    "Want to feel outside",
    "Prefer to stay inside",
    "I don’t have equipment",
];

const inputFieldPlaceHolder = "Add another reason";

function WorkoutAiSupportInput({ onGenerateAlternative }: WorkoutAiSupportInputProps) {
    const [selectedItemTitles, setSelectedItemTitles] = useState<string[]>([]);
    const [selectedTagTitles, setSelectedTagTitles] = useState<string[]>([]);
    const [generated, setGenerated] = useState(false);

    const handleGenerateAlternative = () => {
        const selectedItems = workoutMenuItems.filter(item => selectedItemTitles.includes(item.title));
        const selectedTags = defaultTags.filter(tag => selectedTagTitles.includes(tag));
        onGenerateAlternative(selectedItems, selectedTags);
        setGenerated(true);
    };

    const toggleItem = (title: string) => {
        if (selectedItemTitles.includes(title)) {
            setSelectedItemTitles(selectedItemTitles.filter((t) => t !== title));
        } else {
            setSelectedItemTitles([...selectedItemTitles, title]);
        }
    };

    const toggleTag = (tag: string) => {
        if (selectedTagTitles.includes(tag)) {
            setSelectedTagTitles(selectedTagTitles.filter((t) => t !== tag));
        } else {
            setSelectedTagTitles([...selectedTagTitles, tag]);
        }
    };

    return (
        <div className="flex flex-col items-end p-2">
            <div className="relative speech-bubble-user bg-beige rounded-lg">
                <h2 className="text-lg font-bold">{generated ? "Items to replace" : "Which items to replace?"}</h2>
                {workoutMenuItems.map((item, index) => (
                    generated ? (
                        selectedItemTitles.includes(item.title) && (
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
                        )
                    ) : (
                        <div key={index} className="flex items-center justify-between py-1">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={item.title}
                                    name={item.title}
                                    value={item.title}
                                    className="mr-2 w-6 h-6"
                                    onChange={() => toggleItem(item.title)}
                                />
                                <div>
                                    <h2 className="font-bold">{item.title}</h2>
                                    <h3 className="text-sm text-gray-500">{item.quantity} {item.unit}</h3>
                                </div>
                            </div>
                            <div>
                                <h2 className="font-bold">{(item.kcalPerUnit * item.quantity).toFixed(1)} kcal</h2>
                            </div>
                        </div>
                    )
                ))}
                <h2 className="text-lg font-bold border-t py-1 mt-1">{generated ? "Reasons to replace" : "Why would you like to replace?"}</h2>
                {generated ? (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {selectedTagTitles.map((tag, index) => (
                            <span key={index} className="px-2 py-1 rounded border bg-gray-500 text-white">
                                {tag}
                            </span>
                        ))}
                    </div>
                ) : (
                    <TagsWithAddingField defaultTags={defaultTags} inputFieldPlaceHolder={inputFieldPlaceHolder} selectedTags={selectedTagTitles} onToggleTag={toggleTag} />
                )}
                {!generated && (
                    <div className="flex justify-center border-t pt-2">
                        <button
                            onClick={handleGenerateAlternative}
                            className="px-4 py-2 bg-gray-500 text-white rounded-full"
                        >
                            Generate Alternative
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

// TagsWithAddingField
type TagsWithAddingFieldProps = {
    defaultTags: string[];
    inputFieldPlaceHolder: string;
    selectedTags: string[];
    onToggleTag: (tag: string) => void;
};

function TagsWithAddingField({ defaultTags, inputFieldPlaceHolder, selectedTags, onToggleTag }: TagsWithAddingFieldProps) {
    const [tags, setTags] = useState(defaultTags);
    const [newTag, setNewTag] = useState("");

    const addTag = () => {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            onToggleTag(newTag);
            setNewTag("");
        }
    };

    return (
        <div className="p-4">
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                    <button
                        key={index}
                        onClick={() => onToggleTag(tag)}
                        className={`px-2 py-1 rounded border ${
                            selectedTags.includes(tag)
                                ? "bg-gray-500 text-white"
                                : "bg-white text-gray-700"
                        }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder={inputFieldPlaceHolder}
                    className="flex-1 px-2 py-1 border rounded"
                />
                <button
                    onClick={addTag}
                    className="px-4 py-1 bg-gray-500 text-white rounded"
                >
                    Add
                </button>
            </div>
        </div>
    );
}
