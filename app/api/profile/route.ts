import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/config/db";
import User from "@/models/User";
import { NumberSchema, StringSchema } from "yup";

export async function POST(req: NextRequest) {
  await connectMongoDB();

  try {
    const { username } = await req.json();

    if (!username) {
      return NextResponse.json(
        { message: "Missing required parameters: username" },
        { status: 400 }
      );
    }

    await User.updateOne(
      { age: NumberSchema },
      { gender: StringSchema },
      { height: NumberSchema },
      { weight: NumberSchema },
      { goalWeight: NumberSchema },
      { goalDay: StringSchema },
      { goalCal: NumberSchema },
      { upsert: true }
    );

    return NextResponse.json(
      { message: "Profile info added successfully" },
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
