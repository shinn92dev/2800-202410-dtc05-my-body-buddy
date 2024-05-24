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

    const mealDocument = await Meal.findOne({ userId, date: new Date(date) });
    if (!mealDocument) {
      return NextResponse.json({ message: 'Meal document not found' }, { status: 404 });
    }

    mealDocument[mealType].splice(mealIndex, 1);
    await mealDocument.save();

    return NextResponse.json({ message: 'Meal item deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting meal item:', error);
    return NextResponse.json({ message: 'Error deleting meal item' }, { status: 500 });
  }
}
