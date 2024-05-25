"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import MealForm from './MealForm';
import MealList from './MealList';
import { getLocalDateStringInUTC } from '@/app/_helper/getLocalDateStringInUTC';

interface MealItem {
  name: string;
  quantity?: number;
  unit?: string;
  calories: number;
}

const DietAddMealsWrapper: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [meals, setMeals] = useState<MealItem[]>([]);
  const [userId, setUserId] = useState<string>('');
  const [mealType, setMealType] = useState<string>('');
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserId = async () => {
            try {
                const response = await axios.get('/api/get-user-id');
                console.log("User ID:", response.data.userId);
                setUserId(response.data.userId);
            } catch (error) {
                console.error("Error fetching user ID:", (error as Error).message);
            }
        };

    fetchUserId();
  }, []);

  useEffect(() => {
    const mealTypeParam = searchParams?.get('mealType');
    if (mealTypeParam) {
      setMealType(mealTypeParam);
    }
  }, [searchParams]);

  useEffect(() => {
    setIsSaveDisabled(meals.length === 0 || mealType === '');
  }, [meals, mealType]);

  const addMeal = (meal: MealItem) => {
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
      const date = getLocalDateStringInUTC(); // Get the local date adjusted to UTC
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
        disabled={isSaveDisabled}
        className={`p-2 rounded w-full mt-4 ${isSaveDisabled ? 'bg-gray-300' : 'bg-logo-pumpkin text-white'}`}
      >
        Save Meals
      </button>
    </div>
  );
};

export default DietAddMealsWrapper;
