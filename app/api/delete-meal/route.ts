import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/config/db';
import Meal from '@/models/Meal';

export async function DELETE(req: NextRequest) {
  await connectMongoDB();

  try {
    const { userId, date, mealType, mealIndex } = await req.json();

    if (!userId || !date || !mealType || mealIndex === undefined) {
      return NextResponse.json({ message: 'Missing required parameters' }, { status: 400 });
    }

    const pstDate = new Date(date).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });

    const mealDocument = await Meal.findOne({ userId, 'dailyMeals.date': new Date(pstDate) });

    if (!mealDocument) {
      return NextResponse.json({ message: 'Meal document not found' }, { status: 404 });
    }

    const mealEntry = mealDocument.dailyMeals.find((d: { date: { toString: () => string; }; }) => d.date.toString() === new Date(pstDate).toString());

    if (mealEntry) {
      mealEntry[mealType].splice(mealIndex, 1);
      await mealDocument.save();
      return NextResponse.json({ message: 'Meal item deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Meal entry not found for the date' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting meal item:', error);
    return NextResponse.json({ message: 'Error deleting meal item' }, { status: 500 });
  }
}
