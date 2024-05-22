import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/config/db';
import Meal from '@/models/Meal';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const date = searchParams.get('date');

  await connectMongoDB();

  const meals = await Meal.findOne({ userId, date })
    .populate('breakfast')
    .populate('lunch')
    .populate('dinner')
    .populate('snacks');

  return NextResponse.json(meals, { status: 200 });
}
