import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/config/db";
import Profile from "@/models/Profile";
import Target from "@/models/Target";
import { currentUser } from "@clerk/nextjs/server";
import {
  calculateBmr,
  factorByActivityLevel,
  calculateEnergyRequirementsPerDay,
  calculateCaloriesPerDay,
} from "@/app/_helper/calorie";
import { calculateNumberOfDaysLeft } from "@/app/_helper/handleDate";

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

export async function POST(req: NextRequest) {
  await connectMongoDB();
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { age, gender, height, weight, activityLevel, preference } = await req.json();

    // Validate input data
    if (
      !age ||
      !gender ||
      !height ||
      !weight ||
      !activityLevel ||
      !preference ||
      age < 0 ||
      height < 50 ||
      weight < 10
    ) {
      return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
    }

    const bmr = calculateBmr(age, height, weight, gender);
    const activityFactor = factorByActivityLevel(age, activityLevel);
    const energyRequirements = calculateEnergyRequirementsPerDay(bmr, activityFactor);

    await Profile.updateOne(
      { userId: user.id },
      { age, gender, height, weight, activityLevel, preference },
      { upsert: true }
    );

    let targetCaloriesIntake = energyRequirements;
    let targetCaloriesBurn = energyRequirements;

    const target = await Target.findOne({ userId: user.id });

    if (target) {
      const { targetWeight, targetDate } = target;
      if (targetWeight && targetDate) {
        const numberOfDaysLeft = calculateNumberOfDaysLeft(targetDate);
        const weightGap = weight - targetWeight;

        if (numberOfDaysLeft > 0 && !isNaN(weightGap)) {
          const result = calculateCaloriesPerDay(energyRequirements, numberOfDaysLeft, weightGap, preference);
          targetCaloriesIntake = result.targetCaloriesIntake;
          targetCaloriesBurn = result.targetCaloriesBurn;
        }
      }
    }

    targetCaloriesIntake = Math.round(targetCaloriesIntake);
    targetCaloriesBurn = Math.round(targetCaloriesBurn);

    await Target.updateOne(
      { userId: user.id },
      { targetCaloriesIntake, targetCaloriesBurn },
      { upsert: true }
    );

    return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating profile data:", error);
    return NextResponse.json({ message: "Error updating profile data" }, { status: 500 });
  }
}
