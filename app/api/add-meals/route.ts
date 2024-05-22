import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/config/db';
import Meal from '@/models/Meal';
import MealItem from '@/models/MealItem';

export async function POST(req: NextRequest) {
  await connectMongoDB();

  try {
    const { userId, date, meals, mealType } = await req.json();

    if (!userId || !date || !meals || !mealType) {
      return NextResponse.json({ message: 'Missing required parameters' }, { status: 400 });
    }

    const mealItems = await MealItem.insertMany(meals.map((meal: any) => ({
      name: meal.name,
      amount: meal.amount,
      calories: meal.calories,
    })));

    await Meal.updateOne(
      { userId, date: new Date(date) },
      { $push: { [mealType]: { $each: mealItems.map(item => item._id) } } },
      { upsert: true }
    );

    return NextResponse.json({ message: 'Meals added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error adding meals:', error);
    return NextResponse.json({ message: 'Error adding meals' }, { status: 500 });
  }
}
