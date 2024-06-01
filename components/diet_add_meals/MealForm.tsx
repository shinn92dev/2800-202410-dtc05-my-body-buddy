import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

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
  const maxNameLength = 60;
  const maxQuantity = 10000;
  const minQuantity = 0.01;
  const maxUnitLength = 30;
  const maxCalories = 10000;
  const minCalories = 0.01;

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<number | string>('');
  const [unit, setUnit] = useState('');
  const [calories, setCalories] = useState<number | string>('');

  const validateQuantity = (value: string) => {
    const num = Number(value);
    if (isNaN(num) || num < minQuantity || num > maxQuantity) {
      return false;
    }
    return true;
  };

  const validateCalories = (value: string) => {
    const num = Number(value);
    if (isNaN(num) || num < minCalories || num > maxCalories) {
      return false;
    }
    return true;
  };

  const validateName = (value: string) => {
    if (value.length > maxNameLength) {
      return false;
    }
    return true;
  };

  const validateUnit = (value: string) => {
    if (value.length > maxUnitLength) {
      return false;
    }
    return true;
  };

  const handleAddMeal = () => {
    let valid = true;

    if (!validateName(name)) {
      showToast(`Name must be less than ${maxNameLength} characters.`);
      valid = false;
    }
    if (quantity && !validateQuantity(quantity.toString())) {
      showToast(`Quantity must be between ${minQuantity} and ${maxQuantity}.`);
      valid = false;
    }
    if (unit && !validateUnit(unit)) {
      showToast(`Unit must be less than ${maxUnitLength} characters.`);
      valid = false;
    }
    if (!validateCalories(calories.toString())) {
      showToast(`Calories must be between ${minCalories} and ${maxCalories}.`);
      valid = false;
    }

    if (valid) {
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
    } else {
      showToast('Name and calories are required fields.');
    }
  };

  const showToast = (message: string) => {
    toast.error(message);
  };

  return (
    <div className="mb-4 p-4 bg-beige rounded shadow-md">
      <Toaster />
      <input
        type="text"
        placeholder="Enter meal name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full mb-2"
        maxLength={maxNameLength}
      />
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-2">
        <input
          type="text"
          placeholder="Quantity (optional)"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <input
          type="text"
          placeholder="Unit (optional)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
          maxLength={maxUnitLength}
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
