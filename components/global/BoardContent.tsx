import React from "react";

interface BoardContentProps {
    items: {
        name: string;
        quantity?: number;
        unit?: String;
        calories: number;
    }[];
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
}

const BoardContent: React.FC<BoardContentProps> = ({
    items,
    onEdit,
    onDelete,
}) => {
    return (
        <div>
            {items.map((item, index) => (
                <div
                    key={index}
                    className="flex justify-between items-center p-2 border-b"
                >
                    <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">
                            {item.quantity} {item.unit}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <span className="text-lg font-semibold mr-4">
                            {item.calories} kcal
                        </span>
                        {/*<button*/}
                        {/*    onClick={() => onEdit(index)}*/}
                        {/*    className="text-gray-500 hover:text-gray-700 mr-2"*/}
                        {/*>*/}
                        {/*    ✏️*/}
                        {/*</button>*/}
                        <button
                            onClick={() => onDelete(index)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ➖
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BoardContent;
