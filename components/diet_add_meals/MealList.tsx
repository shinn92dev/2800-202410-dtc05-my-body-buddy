import React from 'react';

interface MealItem {
  name: string;
  quantity?: number;
  unit?: string;
  calories: number;
}

interface MealListProps {
  meals: MealItem[];
  deleteMeal: (index: number) => void;
}

const MealList: React.FC<MealListProps> = ({ meals, deleteMeal }) => {
  const bgColor = meals.length > 0 ? 'bg-beige' : 'bg-white';

  return (
    <div className={`${bgColor} p-4 rounded shadow-md`}>
      {meals.length > 0 ? (
        meals.map((meal, index) => (
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
              className="bg-orange text-white p-1 rounded transition-colors duration-200 hover:bg-orange-hover"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No meals added</div>
      )}
    </div>
  );
};

export default MealList;
