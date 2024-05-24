import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/config/db';
import Meal from '@/models/Meal';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const date = searchParams.get('date');

  if (!userId || !date) {
    return NextResponse.json({ message: 'Missing userId or date parameter' }, { status: 400 });
  }

  await connectMongoDB();

  try {
    const pstDate = new Date(date).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });

    const meals = await Meal.findOne({ userId, 'dailyMeals.date': new Date(pstDate) });

    if (!meals) {
      return NextResponse.json({ message: 'No meals found for the specified date and user' }, { status: 404 });
    }

    const dailyMeal = meals.dailyMeals.find((d: { date: { toString: () => string; }; }) => d.date.toString() === new Date(pstDate).toString());

    return NextResponse.json(dailyMeal, { status: 200 });
  } catch (error) {
    console.error('Error fetching meals:', error);
    return NextResponse.json({ message: 'Error fetching meals' }, { status: 500 });
  }
}
