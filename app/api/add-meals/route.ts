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

    await Meal.updateOne(
      { userId, date: new Date(date) },
      { $push: { [mealType]: { $each: meals } } },
      { upsert: true }
    );

    return NextResponse.json({ message: 'Meals added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error adding meals:', error);
    return NextResponse.json({ message: 'Error adding meals' }, { status: 500 });
  }
}
