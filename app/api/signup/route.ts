import { connectMongoDB } from "@/config/db";
import saveNewUserToMongoDB from "@/app/_helper/saveNewUserToMongoDB";
import { NextResponse } from "next/server";
import UserModel from "@/models/User";

export async function POST(req: any) {
  try {
    await connectMongoDB();
    const { email, username, isLoggedIn, userId } = await req.json();

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 409 }
      );
    }

    const userData = {
      email: email,
      username: username,
      isLoggedIn: isLoggedIn,
      userId: userId,
    };
    await saveNewUserToMongoDB(userData);
    return NextResponse.json(
      { message: "User data saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "An error occurred",
      },
      { status: 500 }
    );
  }
}
