import React, { useState } from 'react';

interface MealFormProps {
  addMeal: (meal: MealItem) => void;
}

interface MealItem {
  name: string;
  quantity?: number;
  unit?: string;
  calories: number;
}

const MealForm: React.FC<MealFormProps> = ({ addMeal }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<number | string>('');
  const [unit, setUnit] = useState('');
  const [calories, setCalories] = useState<number | string>('');

  const validateQuantity = (value: string) => {
    const num = Number(value);
    if (isNaN(num) || num <= 0) {
      return '';
    }
    return value;
  };

  const handleAddMeal = () => {
    if (name && Number(calories) > 0) {
      const meal: MealItem = { name, calories: Number(calories) };
      if (quantity) {
        meal.quantity = Number(quantity);
      }
      if (unit) {
        meal.unit = unit;
      }
      addMeal(meal);
      setName('');
      setQuantity('');
      setUnit('');
      setCalories('');
    }
  };

  return (
    <div className="mb-4 p-4 bg-beige rounded shadow-md">
      <input
        type="text"
        placeholder="Enter meal name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-2">
        <input
          type="text"
          placeholder="Quantity (optional)"
          value={quantity}
          onChange={(e) => setQuantity(validateQuantity(e.target.value))}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <input
          type="text"
          placeholder="Unit (optional)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
      </div>
      <input
        type="number"
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value === '' ? '' : Number(e.target.value))}
        className="border p-2 rounded w-full mb-2"
      />
      <div className='flex justify-center'>
        <button
          onClick={handleAddMeal}
          className="bg-dark-blue text-white p-2 rounded w-1/2 transition-colors duration-200 hover:bg-dark-blue-hover"
        >
          Add Selected Meals
        </button>
      </div>
    </div>
  );
};

export default MealForm;
