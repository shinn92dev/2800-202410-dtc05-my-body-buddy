import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/config/db";
import Profile from "@/models/Profile";
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

    await Profile.updateOne(
      { userId: user.id },
      { age, gender, height, weight, activityLevel, preference},
      { upsert: true }
    );

    return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating profile data:", error);
    return NextResponse.json({ message: "Error updating profile data" }, { status: 500 });
  }
}
