import React from 'react';
import BoardContent from './BoardContent';

interface BoardProps {
    icon: React.ReactNode;
    title: string;
    items: { name: string; quantity?: number; unit?: string; calories: number }[];
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
    onAdd: () => void;
}

const Board: React.FC<BoardProps> = ({ icon, title, items, onEdit, onDelete, onAdd }) => {
    const totalCalories = items.reduce((total, item) => total + item.calories, 0);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    {icon}
                    <h2 className="text-xl font-bold ml-2">{title}</h2>
                </div>
                <span className="text-lg font-semibold">{totalCalories} kcal</span>
            </div>
            <BoardContent items={items} onEdit={onEdit} onDelete={onDelete} />
            <div className="flex justify-center mt-4">
                <button onClick={onAdd} className="text-2xl text-gray-500 hover:text-gray-700 font-semibold">
                    +
                </button>
            </div>
        </div>
    );
};

export default Board;