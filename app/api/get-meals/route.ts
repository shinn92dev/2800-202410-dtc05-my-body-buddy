import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/config/db';
import Meal from '@/models/Meal';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const date = searchParams.get('date');

  if (!userId || !date) {
    console.error('Missing userId or date parameter');
    return NextResponse.json({ message: 'Missing userId or date parameter' }, { status: 400 });
  }

  await connectMongoDB();

  try {
    const meals = await Meal.findOne({ userId });

    if (!meals) {
      console.log(`No meals found for userId: ${userId}`);
      return NextResponse.json({ message: 'No meals found for the specified user' }, { status: 404 });
    }

    const dateObj = new Date(date).toISOString().split('T')[0];
    const dailyMeal = meals.dailyMeals.find((d: { date: { toISOString: () => string; }; }) => {
      const mealDate = d.date.toISOString().split('T')[0];
      return mealDate === dateObj;
    });

    if (!dailyMeal) {
      console.log(`No meals found for date: ${date}`);
      return NextResponse.json({ message: 'No meals found for the specified date' }, { status: 404 });
    }

    // Convert the document to a plain JavaScript object and adjust the format
    const responseData = JSON.parse(JSON.stringify(dailyMeal, (key, value) => {
      if (key === '_id' || key === 'userId') {
        return value.toString();
      }
      if (key === 'date') {
        return new Date(value).toISOString();
      }
      return value;
    }));

    console.log('Response data:', responseData);

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('Error fetching meals:', error);
    return NextResponse.json({ message: 'Error fetching meals', error: (error as Error).message }, { status: 500 });
  }
}
