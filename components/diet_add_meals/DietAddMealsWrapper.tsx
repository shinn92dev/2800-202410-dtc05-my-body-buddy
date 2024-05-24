"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import MealForm from './MealForm';
import MealList from './MealList';

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

  const addMeal = (meal: Meal) => {
    setMeals([...meals, meal]);
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
    <div className="p-4 min-h-screen">
      <MealForm addMeal={addMeal} />
      <MealList meals={meals} deleteMeal={deleteMeal} />
      <button
        onClick={saveMeals}
        className="bg-logo-pumpkin text-white p-2 rounded w-full mt-4"
      >
        Save Meals
      </button>
    </div>
  );
};

export default DietAddMealsWrapper;
