import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/config/db";
import Target from "@/models/Target";
import Profile from "@/models/Profile";
import { currentUser } from "@clerk/nextjs/server";
import { calculateCaloriesPerDay, calculateBmr, factorByActivityLevel, calculateEnergyRequirementsPerDay } from "@/app/_helper/calorie";

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

export async function POST(req: NextRequest) {
  await connectMongoDB();
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { targetWeight, targetDate, activityLevel, preference } = await req.json();
    const profile = await Profile.findOne({ userId: user.id });

    if (!profile) {
      return NextResponse.json({ message: "Profile data not found" }, { status: 404 });
    }

    const { age, gender, height, weight } = profile;
    const bmr = calculateBmr(age, height, weight, gender);
    const activityFactor = factorByActivityLevel(age, activityLevel);
    const energyRequirements = calculateEnergyRequirementsPerDay(bmr, activityFactor);
    const weightGap = weight - targetWeight;

    const { targetCaloriesIntake, targetCaloriesBurn } = calculateCaloriesPerDay(energyRequirements, 30, weightGap, preference);

    await Target.updateOne(
      { userId: user.id },
      { targetCaloriesIntake, targetCaloriesBurn, targetWeight, targetDate: targetDate ? new Date(targetDate) : null, activityLevel, preference },
      { upsert: true }
    );

    return NextResponse.json({ message: "Target data updated successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error updating target data:", error);
    return NextResponse.json({ message: "Error updating target data" }, { status: 500 });
  }
}
