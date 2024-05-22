import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/config/db';
import Meal from '@/models/Meal';
import MealItem from '@/models/MealItem';

export async function POST(req: Request) {
  const { userId, date, mealType, item } = await req.json();

  await connectMongoDB();

  const newItem = new MealItem(item);
  await newItem.save();

  let meal = await Meal.findOne({ userId, date });
  if (!meal) {
    meal = new Meal({ userId, date, breakfast: [], lunch: [], dinner: [], snacks: [] });
  }
  meal[mealType].push(newItem._id);
  await meal.save();

  return NextResponse.json(meal, { status: 201 });
}
