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

    const pstDate = new Date(date).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });

    const result = await Meal.findOneAndUpdate(
      { userId },
      { $set: { 'dailyMeals.$[element].date': new Date(pstDate) }, $push: { [`dailyMeals.$[element].${mealType}`]: { $each: meals } } },
      { arrayFilters: [{ 'element.date': new Date(pstDate) }], upsert: true, new: true }
    );

    if (!result) {
      await Meal.updateOne(
        { userId },
        { $push: { dailyMeals: { date: new Date(pstDate), [mealType]: meals } } },
        { upsert: true }
      );
    }

    return NextResponse.json({ message: 'Meals added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error adding meals:', error);
    return NextResponse.json({ message: 'Error adding meals' }, { status: 500 });
  }
}
