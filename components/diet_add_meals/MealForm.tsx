import React, { useState } from 'react';

interface MealFormProps {
  addMeal: (meal: Meal) => void;
}

interface Meal {
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
      const meal: Meal = { name, calories: Number(calories) };
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
    <div className="mb-4">
      <input
        type="text"
        placeholder="Enter meal name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <div className="flex space-x-2 mb-2">
        <input
          type="text"
          placeholder="Quantity (optional)"
          value={quantity}
          onChange={(e) => setQuantity(validateQuantity(e.target.value))}
          className="border p-2 rounded w-1/2"
        />
        <input
          type="text"
          placeholder="Unit (optional)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
      </div>
      <input
        type="number"
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value === '' ? '' : Number(e.target.value))}
        className="border p-2 rounded w-full mb-2"
      />
      <button
        onClick={handleAddMeal}
        className="bg-dark-blue text-white p-2 rounded w-full"
      >
        Add Selected Meals
      </button>
    </div>
  );
};

export default MealForm;
