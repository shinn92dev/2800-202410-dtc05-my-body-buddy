import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/config/db';
import Meal from '@/models/Meal';

export async function POST(req: NextRequest) {
  await connectMongoDB();

  try {
    const { userId, date, meals, mealType } = await req.json();

    if (!userId || !date || !meals || !mealType) {
      return NextResponse.json({ message: 'Missing required parameters' }, { status: 400 });
    }

    const existingMeal = await Meal.findOne({ userId, 'dailyMeals.date': new Date(date) });

    if (existingMeal) {
      await Meal.findOneAndUpdate(
        { userId, 'dailyMeals.date': new Date(date) },
        { $push: { [`dailyMeals.$.${mealType}`]: { $each: meals } } },
        { new: true }
      );
    } else {
      await Meal.updateOne(
        { userId },
        { $push: { dailyMeals: { date: new Date(date), [mealType]: meals } } },
        { upsert: true }
      );
    }

    return NextResponse.json({ message: 'Meals added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error adding meals:', error);
    return NextResponse.json({ message: 'Error adding meals' }, { status: 500 });
  }
}
