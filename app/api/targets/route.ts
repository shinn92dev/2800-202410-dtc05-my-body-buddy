import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/config/db";
import Target from "@/models/Target";
import Profile from "@/models/Profile";
import { currentUser } from "@clerk/nextjs/server";
import { calculateCaloriesPerDay, calculateBmr, factorByActivityLevel, calculateEnergyRequirementsPerDay } from "@/app/_helper/calorie";
import { calculateNumberOfDaysLeft } from "@/app/_helper/handleDate";

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
    const { targetWeight, targetDate } = await req.json();
    const profile = await Profile.findOne({ userId: user.id });

    if (!profile) {
      return NextResponse.json({ message: "Profile data not found" }, { status: 404 });
    }

    const { age, gender, height, weight, activityLevel, preference } = profile;
    const bmr = calculateBmr(age, height, weight, gender);
    const activityFactor = factorByActivityLevel(age, activityLevel);
    const energyRequirements = calculateEnergyRequirementsPerDay(bmr, activityFactor);

    let targetCaloriesIntake = energyRequirements;
    let targetCaloriesBurn = energyRequirements;

    if (targetWeight && targetDate) {
      const numberOfDaysLeft = calculateNumberOfDaysLeft(targetDate);
      const weightGap = weight - targetWeight;

      if (numberOfDaysLeft > 0 && !isNaN(weightGap)) {
        const result = calculateCaloriesPerDay(energyRequirements, numberOfDaysLeft, weightGap, preference);
        targetCaloriesIntake = result.targetCaloriesIntake;
        targetCaloriesBurn = result.targetCaloriesBurn;
      }
    }

    if (isNaN(targetCaloriesIntake) || isNaN(targetCaloriesBurn)) {
      throw new Error("Invalid calculation result");
    }

    await Target.updateOne(
      { userId: user.id },
      { targetCaloriesIntake, targetCaloriesBurn, targetWeight, targetDate: targetDate ? new Date(targetDate) : null },
      { upsert: true }
    );

    return NextResponse.json({ message: "Target data updated successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error updating target data:", error);
    return NextResponse.json({ message: "Error updating target data" }, { status: 500 });
  }
}
