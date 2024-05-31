import { NextRequest, NextResponse } from "next/server";
import WorkoutModel from "../../../models/Workout";
import { connectMongoDB } from "@/config/db";
import { filterWorkoutForSpecificDate } from "@/app/_helper/workout";

export async function GET(req: NextRequest) {
    // Connect to MongoDB
    await connectMongoDB();

    try {
        // Parse URL parameters
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        const date = searchParams.get("date");

        // Check for missing required parameters
        if (!userId || !date) {
            console.error("Missing userId or date parameter");
            return NextResponse.json(
                { message: "Missing userId or date parameter" },
                { status: 400 }
            );
        }

        // Fetch workouts for the current user from the database
        const workoutsForCurrentUser = await WorkoutModel.findOne({ userId });

        // If no workouts are found for the user, return an empty response
        if (!workoutsForCurrentUser) {
            console.log(`No workout found for userId: ${userId}`);
            return NextResponse.json(
                { achieved: [], onGoing: [] },
                { status: 200 }
            );
        }

        // Format the date and filter workouts for the specified date
        const dateObj = new Date(date).toISOString().split("T")[0];
        const filteredWorkout = filterWorkoutForSpecificDate(
            workoutsForCurrentUser,
            dateObj
        );

        // If no workouts are found for the specified date, return an empty response
        if (
            filteredWorkout.achieved.length === 0 &&
            filteredWorkout.onGoing.length === 0
        ) {
            console.log("No workout found for date:", date);
            return NextResponse.json(filteredWorkout, { status: 200 });
        }

        // Return the filtered workouts
        return NextResponse.json(filteredWorkout, { status: 200 });
    } catch (error) {
        // Log and return an error message if an exception occurs
        console.error("Error fetching workouts:", error);
        return NextResponse.json(
            {
                message: "Error fetching workouts",
                error: (error as Error).message,
            },
            { status: 500 }
        );
    }
}
