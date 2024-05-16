type WorkoutAiSupportInputProps = {
    onGenerateAlternative: () => void;
};

import WorkoutAiSupportInputCheckbox from "@/components/workout_ai_support/WorkoutAiSupportInputCheckbox";
import TagsWithAddingField from "@/components/global/TagsWithAddingField";
import "@/components/workout_ai_support/WorkoutAiSupportInput.scss";

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
    return (
        <div className="flex flex-col items-end p-2">
            <div className="relative speech-bubble-user bg-beige rounded-lg">
                <h2 className="text-lg font-bold">Which items to replace?</h2>
                {workoutMenuItems.map((item, index) => (
                    <WorkoutAiSupportInputCheckbox
                        key={index}
                        title={item.title}
                        quantity={item.quantity}
                        unit={item.unit}
                        kcalPerUnit={item.kcalPerUnit}
                    />
                ))}
                <h2 className="text-lg font-bold border-t mt-2">Why would you like to replace?</h2>
                <TagsWithAddingField defaultTags={defaultTags} inputFieldPlaceHolder={inputFieldPlaceHolder} />
                <div className="flex justify-center border-t pt-2">
                    <button
                        onClick={onGenerateAlternative}
                        className="px-4 py-2 bg-gray-500 text-white rounded-full"
                    >
                        Generate Alternative
                    </button>
                </div>
            </div>
        </div>
    );
}
