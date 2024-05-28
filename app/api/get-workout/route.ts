import { NextRequest, NextResponse } from "next/server";
import WorkoutModel from "../../../models/Workout";
import { connectMongoDB } from "@/config/db";

export async function GET(req: NextRequest) {
    await connectMongoDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
        return NextResponse.json(
            { error: "User ID is required" },
            { status: 400 }
        );
    }

    try {
        const workouts = await WorkoutModel.findOne({ userId: userId });

        if (!workouts) {
            return NextResponse.json(
                { error: "No workout data found for this user." },
                { status: 404 }
            );
        }

        return NextResponse.json(workouts, { status: 200 });
    } catch (error) {
        console.error("Error fetching workout data:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
