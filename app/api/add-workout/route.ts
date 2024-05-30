import { NextResponse } from "next/server";
import WorkoutModel from "@/models/Workout";
import { auth } from "@clerk/nextjs/server";
import { connectMongoDB } from "@/config/db";

export async function POST(req: any) {
    try {
        const data = await req.json();
        const { date, workouts } = data.params;
        const { userId } = auth();

        if (!userId || !date || !workouts) {
            return NextResponse.json(
                { message: "Missing required parameters" },
                { status: 400 }
            );
        }
        console.log(date, workouts, userId);
        return NextResponse.json(
            { message: "Workout added successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error while adding workout:", error);
    }
}
