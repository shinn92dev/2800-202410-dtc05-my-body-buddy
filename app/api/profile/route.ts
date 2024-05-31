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

// Define TypeScript interfaces for the Profile and Target models
interface ProfileData {
  userId: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  activityLevel: number;
  preference: string;
}

interface TargetData {
  userId: string;
  targetWeight: number | null | undefined;
  targetDate: Date | null | undefined;
  targetCaloriesIntake: number;
  targetCaloriesBurn: number;
}

// Validate input data
const validateInput = (age: number, gender: string, height: number, weight: number, activityLevel: number, preference: string) => {
  return age > 0 && height >= 50 && weight >= 10 && gender && activityLevel && preference;
};

// Get profile data
const getProfile = async (userId: string): Promise<ProfileData | null> => {
  return await Profile.findOne({ userId }).lean().exec() as ProfileData | null;
};

// Get target data
const getTarget = async (userId: string): Promise<TargetData | null> => {
  return await Target.findOne({ userId }).lean().exec() as TargetData | null;
};

// Update profile data
const updateProfile = async (userId: string, data: Partial<ProfileData>) => {
  return await Profile.updateOne({ userId }, data, { upsert: true });
};

// Update target data
const updateTarget = async (userId: string, data: Partial<TargetData>) => {
  return await Target.updateOne({ userId }, data, { upsert: true });
};

export async function GET(req: NextRequest) {
  await connectMongoDB();
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const profile = await getProfile(user.id);
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

    if (!validateInput(age, gender, height, weight, activityLevel, preference)) {
      return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
    }

    const bmr = calculateBmr(age, height, weight, gender);
    const activityFactor = factorByActivityLevel(age, activityLevel);
    const energyRequirements = calculateEnergyRequirementsPerDay(bmr, activityFactor);

    await updateProfile(user.id, { age, gender, height, weight, activityLevel, preference });

    let targetCaloriesIntake = energyRequirements;
    let targetCaloriesBurn = energyRequirements;

    const target = await getTarget(user.id);

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

    await updateTarget(user.id, { targetCaloriesIntake, targetCaloriesBurn });

    return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating profile data:", error);
    return NextResponse.json({ message: "Error updating profile data" }, { status: 500 });
  }
}