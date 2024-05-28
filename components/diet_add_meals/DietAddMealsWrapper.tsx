"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import MealForm from './MealForm';
import MealList from './MealList';
import { fetchUserId } from '@/app/_helper/fetchUserId';

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
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const userId = await fetchUserId();
        console.log("User ID:", userId);
        setUserId(userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    getUserId();
  }, []);

  useEffect(() => {
    const mealTypeParam = searchParams?.get('mealType');
    const dateParam = searchParams?.get('date');
    if (mealTypeParam) {
      setMealType(mealTypeParam);
    }
    if (dateParam) {
      setSelectedDate(dateParam);
    }
  }, [searchParams]);

  useEffect(() => {
    setIsSaveDisabled(meals.length === 0 || mealType === '' || selectedDate === '');
  }, [meals, mealType, selectedDate]);

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
      await axios.post('/api/add-meals', {
        userId,
        date: selectedDate,
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
