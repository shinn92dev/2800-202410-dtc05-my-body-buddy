import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/config/db";
import Profile from "@/models/Profile";
import Target from "@/models/Target";
import { currentUser } from "@clerk/nextjs/server";
import { calculateCaloriesPerDay, calculateBmr, factorByActivityLevel, calculateEnergyRequirementsPerDay } from "@/app/_helper/calorie";

// Update profile and target data
export async function POST(req: NextRequest) {
  await connectMongoDB();
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { age, gender, height, weight, targetWeight, targetDate, activityLevel, numberOfDays, preference } = await req.json();

    // Calculate BMR
    const bmr = calculateBmr(age, height, weight, gender);

    // Get activity level factor
    const activityFactor = factorByActivityLevel(age, activityLevel);

    // Calculate daily energy requirements
    const energyRequirements = calculateEnergyRequirementsPerDay(bmr, activityFactor);

    // Calculate weight gap
    const weightGap = weight - targetWeight;

    // Calculate target calories intake and burn
    const { targetCaloriesIntake, targetCaloriesBurn } = calculateCaloriesPerDay(energyRequirements, numberOfDays, weightGap, preference);

    // Update profile
    await Profile.updateOne(
      { userId: user.id },
      {
        age,
        gender,
        height,
        weight,
      },
      { upsert: true }
    );

    // Update target data
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

    return NextResponse.json({ message: "Profile info and target data added/updated successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error editing profile and target data:", error);
    return NextResponse.json({ message: "Error editing profile and target data" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await connectMongoDB();
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const profile = await Profile.findOne({ userId: user.id });
    if (!profile) {
      return NextResponse.json({ message: "Profile not found" }, { status: 404 });
    }
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return NextResponse.json({ message: "Error fetching profile data" }, { status: 500 });
  }
}
