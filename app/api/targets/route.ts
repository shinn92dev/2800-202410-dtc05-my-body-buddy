import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/config/db";
import Target from "@/models/Target";
import { currentUser } from "@clerk/nextjs/server";

// Fetch target data
export async function GET(req: NextRequest) {
  await connectMongoDB();
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const target = await Target.findOne({ userId: user.id });
    if (!target) {
      return NextResponse.json({ message: "Target data not found" }, { status: 404 });
    }
    return NextResponse.json(target);
  } catch (error) {
    console.error("Error fetching target data:", error);
    return NextResponse.json({ message: "Error fetching target data" }, { status: 500 });
  }
}

// Update target data
export async function POST(req: NextRequest) {
  await connectMongoDB();
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { targetCaloriesIntake, targetCaloriesBurn, targetWeight, targetDate, activityLevel } = await req.json();

    await Target.updateOne(
      { userId: user.id },
      {
        targetCaloriesIntake,
        targetCaloriesBurn,
        targetWeight,
        targetDate: targetDate ? new Date(targetDate) : null,
        activityLevel,
      },
      { upsert: true }
    );

    return NextResponse.json({ message: "Target data updated successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error updating target data:", error);
    return NextResponse.json({ message: "Error updating target data" }, { status: 500 });
  }
}
