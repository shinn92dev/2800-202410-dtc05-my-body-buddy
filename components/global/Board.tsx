import React from "react";
import BoardContent from "./BoardContent";
import { calculateKcalForWorkout } from "@/app/_helper/workout";
import { WorkoutDetail } from "@/config/types";
interface BoardProps {
    icon: React.ReactNode;
    title: string;
    items: WorkoutDetail[];
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
    onAdd: () => void;
}

const Board: React.FC<BoardProps> = ({
    icon,
    title,
    items,
    onEdit,
    onDelete,
    onAdd,
}) => {
    const totalCalories = calculateKcalForWorkout(items);

    return (
        <div className="p-4 bg-beige rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    {icon}
                    <h2 className="text-xl font-bold ml-2">{title}</h2>
                </div>
                <span className="text-lg font-semibold">
                    {totalCalories} kcal
                </span>
            </div>
            <BoardContent items={items} onEdit={onEdit} onDelete={onDelete} />
            <div className="flex justify-center mt-4">
                <button
                    onClick={onAdd}
                    className="text-2xl text-gray-500 hover:text-gray-700 font-semibold"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default Board;
