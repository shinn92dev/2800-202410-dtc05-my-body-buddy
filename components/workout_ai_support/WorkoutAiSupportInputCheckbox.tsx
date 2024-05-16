type workoutAiSupportInputCheckboxProps = {
    title: string;
    quantity: number;
    unit: string;
    kcalPerUnit: number;
};

export default function WorkoutAiSupportInputCheckbox({ title, quantity, unit, kcalPerUnit }: workoutAiSupportInputCheckboxProps) {
    return (
        <div className="flex items-center justify-between py-1">
            <div className="flex items-center">
                <input type="checkbox" id={title} name={title} value={title} className="mr-2 w-6 h-6" />
                <div>
                    <h1 className="text-lg font-bold">{title}</h1>
                    <h2 className="text-sm text-gray-500">{quantity} {unit}</h2>
                </div>
            </div>
            <div>
                <h1 className="text-lg font-bold">{(kcalPerUnit * quantity).toFixed(2)} kcal</h1>
            </div>
        </div>
    );
}
