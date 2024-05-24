import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/config/db";
import UserModel from "@/models/User";

export async function POST(req: NextRequest) {
    await connectMongoDB();

    const { name, age, gender, height, weight, goalWeight, goalDay, goalCal } =
        await req.json();

    try {
        const user = await UserModel.findOneAndUpdate(
            { username: name },
            { age, gender, height, weight, goalWeight, goalDay, goalCal },
            { new: true, upsert: true }
        );

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "User data updated successfully", user },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating user data:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    return NextResponse.json(
        { message: "Method Not Allowed" },
        { status: 405 }
    );
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
