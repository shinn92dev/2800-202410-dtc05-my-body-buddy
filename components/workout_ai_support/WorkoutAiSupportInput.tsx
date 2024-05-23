import { useState } from "react";
import TagsWithAddingField from "@/components/global/TagsWithAddingField";
import "@/components/workout_ai_support/WorkoutAiSupportInput.scss";

type WorkoutAiSupportInputProps = {
    onGenerateAlternative: (selectedItems: any[], selectedTags: string[], result: string) => void;
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

export default function WorkoutAiSupportInput({ onGenerateAlternative }: WorkoutAiSupportInputProps) {
    const [selectedItemTitles, setSelectedItemTitles] = useState<string[]>([]);
    const [selectedTagTitles, setSelectedTagTitles] = useState<string[]>([]);
    const [generated, setGenerated] = useState(false);

    const handleGenerateAlternative = async () => {
        const selectedItems = workoutMenuItems.filter(item => selectedItemTitles.includes(item.title));
        const selectedTags = defaultTags.filter(tag => selectedTagTitles.includes(tag));
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
                throw new Error('Failed to generate alternative.');
            }

            const data = await response.json();
            onGenerateAlternative(selectedItems, selectedTags, data.result);
            setGenerated(true);
        } catch (error) {
            console.error(error);
        }
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
                            <span key={index} className="px-2 py-1 rounded border bg-dark-blue text-white">
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
                            className="px-4 py-2 bg-dark-blue text-white rounded-full"
                        >
                            Generate Alternative
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
