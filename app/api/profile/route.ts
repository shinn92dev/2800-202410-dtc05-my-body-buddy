import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/config/db";
import Profile from "@/models/Profile";
import UserModel from "@/models/User";
import { currentUser } from "@clerk/nextjs/server";

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
    const userInfo = await UserModel.findOne({ userId: user.id });
    if (!userInfo) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({
      ...profile.toObject(),
      name: userInfo.username,
      goalDate: profile.goalDate ? profile.goalDate.toISOString().split("T")[0] : null,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ message: "Error fetching profile" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connectMongoDB();
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { age, gender, height, weight, goalWeight, goalDate } = await req.json();

    await Profile.updateOne(
      { userId: user.id },
      {
        age,
        gender,
        height,
        weight,
        goalWeight,
        goalDate: goalDate ? new Date(goalDate) : null,
      },
      { upsert: true }
    );

    return NextResponse.json({ message: "Profile info added/updated successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error editing profile:", error);
    return NextResponse.json({ message: "Error editing profile info" }, { status: 500 });
  }
}
