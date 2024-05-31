import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/config/db";
import { currentUser } from "@clerk/nextjs/server";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  await connectMongoDB();
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const loginUser = await User.findOne({ userId: user.id });
    if (!loginUser) {
      return NextResponse.json({ message: "Profile not found" }, { status: 404 });
    }
    return NextResponse.json(loginUser);
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return NextResponse.json({ message: "Error fetching profile data" }, { status: 500 });
  }
}
