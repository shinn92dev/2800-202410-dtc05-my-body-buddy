"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

interface Meal {
  name: string;
  quantity?: number;
  unit?: string;
  calories: number;
}

const DietAddMealsWrapper: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<number | string>('');
  const [unit, setUnit] = useState('');
  const [calories, setCalories] = useState<number | string>('');
  const [userId, setUserId] = useState<string>('');
  const [mealType, setMealType] = useState<string>('');

  useEffect(() => {
    const fetchUserId = async () => {
      const fetchedUserId = "664719634ee345ddb6962d13"; // temporary user ID
      setUserId(fetchedUserId);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const mealTypeParam = searchParams?.get('mealType');
    if (mealTypeParam) {
      setMealType(mealTypeParam);
    }
  }, [searchParams]);

  const validateQuantity = (value: string) => {
    const num = Number(value);
    if (isNaN(num) || num <= 0) {
      return '';
    }
    return value;
  };

  const addMeal = () => {
    if (name && Number(calories) > 0) {
      const meal: Meal = { name, calories: Number(calories) };
      if (quantity) {
        meal.quantity = Number(quantity);
      }
      if (unit) {
        meal.unit = unit;
      }
      setMeals([...meals, meal]);
      setName('');
      setQuantity('');
      setUnit('');
      setCalories(0);
    }
  };

  const deleteMeal = (index: number) => {
    setMeals(meals.filter((_, i) => i !== index));
  };

  const saveMeals = async () => {
    if (!userId) {
      alert('User ID is not set');
      return;
    }

    try {
      const date = new Date().toISOString().split('T')[0];
      await axios.post('/api/add-meals', {
        userId,
        date,
        meals,
        mealType,
      });
      alert('Meals saved successfully');
      router.push('/diet'); // Redirect to diet home page
    } catch (error) {
      console.error('Error saving meals:', error);
      alert('Failed to save meals');
    }
  };

  return (
    <div className="p-4">
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
            type="number"
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
          onClick={addMeal}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Add Selected Meals
        </button>
      </div>
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
              className="bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={saveMeals}
        className="bg-green-500 text-white p-2 rounded w-full mt-4"
      >
        Save Meals
      </button>
    </div>
  );
};

export default DietAddMealsWrapper;
