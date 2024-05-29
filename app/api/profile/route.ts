// pages/api/profile.ts
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/config/db";
import Profile from "@/models/Profile";

export async function POST(req: NextRequest) {
  await connectMongoDB();

  try {
    const { userId, age, gender, height, weight, goalWeight, goalDate } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { message: "Missing required parameter: userId" },
        { status: 400 }
      );
    }

    // Update or insert profile information
    await Profile.updateOne(
      { userId },
      {
        age,
        gender,
        height,
        weight,
        goalWeight,
        goalDate,
      },
      { upsert: true }
    );

    return NextResponse.json(
      { message: "Profile info added/updated successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error editing profile:", error);
    return NextResponse.json(
      { message: "Error editing profile info" },
      { status: 500 }
    );
  }
}
