import React from 'react';

interface Meal {
  name: string;
  quantity?: number;
  unit?: string;
  calories: number;
}

interface MealListProps {
  meals: Meal[];
  deleteMeal: (index: number) => void;
}

const MealList: React.FC<MealListProps> = ({ meals, deleteMeal }) => {
  return (
    <div>
      {meals.map((meal, index) => (
        <div key={index} className="flex justify-between items-center mb-2 border-b pb-2">
          <div>
            <div className="font-bold">{meal.name}</div>
            <div className="text-sm text-gray-500">
              {meal.quantity && meal.unit ? `${meal.quantity} ${meal.unit}` : meal.quantity ? meal.quantity : ''}
            </div>
            <div className="text-lg">{meal.calories} kcal</div>
          </div>
          <button
            onClick={() => deleteMeal(index)}
            className="bg-orange text-white p-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MealList;
