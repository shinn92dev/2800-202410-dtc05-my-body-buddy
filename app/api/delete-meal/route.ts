import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/config/db';
import Meal from '@/models/Meal';

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export async function DELETE(req: NextRequest) {
  await connectMongoDB();

  try {
    const { userId, date, mealType, mealIndex } = await req.json();

    if (!userId || !date || !mealType || mealIndex === undefined) {
      console.error('Missing required parameters');
      return NextResponse.json({ message: 'Missing required parameters' }, { status: 400 });
    }

    if (!['breakfast', 'lunch', 'dinner', 'snacks'].includes(mealType)) {
      console.error('Invalid mealType');
      return NextResponse.json({ message: 'Invalid mealType' }, { status: 400 });
    }

    const dateObj = new Date(date).toISOString().split('T')[0];

    const mealDocument = await Meal.findOne({ userId });

    if (!mealDocument) {
      console.error(`Meal document not found for userId: ${userId}`);
      return NextResponse.json({ message: 'Meal document not found' }, { status: 404 });
    }

    const dailyMeal = mealDocument.dailyMeals.find((d: { date: { toISOString: () => string; }; }) => {
      const mealDate = d.date.toISOString().split('T')[0];
      return mealDate === dateObj;
    });

    if (!dailyMeal) {
      console.error(`Meal entry not found for date: ${date}`);
      return NextResponse.json({ message: 'Meal entry not found for the date' }, { status: 404 });
    }

    const mealTypeKey = mealType as keyof typeof dailyMeal;
    if (!dailyMeal[mealTypeKey] || dailyMeal[mealTypeKey].length <= mealIndex) {
      console.error(`Meal type or index is invalid for mealType: ${mealType} and mealIndex: ${mealIndex}`);
      return NextResponse.json({ message: 'Meal type or index is invalid' }, { status: 400 });
    }

    dailyMeal[mealTypeKey].splice(mealIndex, 1);
    await mealDocument.save();

    console.log(`Meal item deleted successfully for userId: ${userId}, date: ${date}, mealType: ${mealType}, mealIndex: ${mealIndex}`);
    return NextResponse.json({ message: 'Meal item deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting meal item:', (error as Error).message);
    return NextResponse.json({ message: 'Error deleting meal item', error: (error as Error).message }, { status: 500 });
  }
}
