import WorkoutAiSupportInputCheckbox from "@/components/workout_ai_support/WorkoutAiSupportInputCheckbox";
import "@/components/workout_ai_support/WorkoutAiSupportInput.scss";

export default function WorkoutAiSupportInput() {
    const workoutMenuItems = [
        {"title": "Crunches", "quantity": 50, "unit": "crunches", "kcalPerUnit": 4.92},
        {"title": "Cycling", "quantity": 4, "unit": "km", "kcalPerUnit": 30}];

    return (
        <div className="flex flex-col items-end p-2">
            <div className="relative speech-bubble-user bg-beige rounded-lg">
                <h1 className="text-xl font-bold">Which items to replace?</h1>
                {/* display Checkboxes based on workout menu items, passing title, quantity, unit, and kcalPerUnit of each item */}
                {workoutMenuItems.map((item, index) => (
                    <WorkoutAiSupportInputCheckbox
                        key={index}
                        title={item.title}
                        quantity={item.quantity}
                        unit={item.unit}
                        kcalPerUnit={item.kcalPerUnit}
                    />
                ))}
            </div>
        </div>
    );
}