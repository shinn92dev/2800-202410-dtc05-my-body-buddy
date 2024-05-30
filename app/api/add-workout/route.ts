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
        const [year, month, day] = date.split("-").map(Number);
        const formattedDate = new Date(Date.UTC(year, month - 1, day));
        // Check if the user's data is found
        const targetUserWorkout = await WorkoutModel.findOne({
            userId,
        });

        if (!targetUserWorkout) {
            return NextResponse.json(
                { message: "User's workout not found" },
                { status: 404 }
            );
        }
        const workoutsForDate = targetUserWorkout.workouts.find(
            (workout) => workout.date.getTime() === formattedDate.getTime()
        );
        console.log(workoutsForDate);

        if (!workoutsForDate) {
            return NextResponse.json(
                { message: "No workouts found for the given date" },
                { status: 404 }
            );
        }

        const workoutIndex = targetUserWorkout.workouts.findIndex(
            (workout) => workout.date.getTime() === formattedDate.getTime()
        );
        const addedWorkout = await WorkoutModel.updateOne(
            {
                userId,
            },
            {
                $push: {
                    [`workouts.${workoutIndex}.workoutDetail`]: {
                        $each: workouts,
                    },
                },
            }
        );

        if (addedWorkout.matchedCount === 0) {
            return NextResponse.json(
                { message: "Failed to add new workout" },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "Workout added successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error while adding workout:", error);
    }
}
