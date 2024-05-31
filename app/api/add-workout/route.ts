import { NextResponse } from "next/server";
import WorkoutModel from "@/models/Workout";
import { auth } from "@clerk/nextjs/server";
import { connectMongoDB } from "@/config/db";
import { fetchWorkoutForSpecificDate } from "@/app/_helper/workout";
import { Workout, WorkoutDetail } from "@/config/types";

export async function POST(req: any) {
    await connectMongoDB();
    try {
        const data = await req.json();
        const { date, workouts, type } = data.params;
        const { userId } = auth();

        if (!userId || !date || !workouts) {
            return NextResponse.json(
                { message: "Missing required parameters" },
                { status: 400 }
            );
        }

        const [year, month, day] = date.split("-").map(Number);
        const formattedDate = new Date(Date.UTC(year, month - 1, day));
        // Check if the user's data is found
        let targetUserWorkout = await WorkoutModel.findOne({
            userId,
        });

        if (!targetUserWorkout) {
            // Create new user workout if not found
            targetUserWorkout = new WorkoutModel({ userId, workouts: [] });
            await targetUserWorkout.save();
        }
        console.log(type, "!!!!!!!!!!!!!!!");
        let workoutsForDate = targetUserWorkout.workouts.find(
            (workout: Workout) =>
                workout.date.getTime() === formattedDate.getTime()
        );
        if (!workoutsForDate) {
            const newWorkouts: Workout[] = [];
            for (let i = 0; i < 7; i++) {
                const newDate = new Date(formattedDate);
                newDate.setUTCDate(formattedDate.getUTCDate() + i);
                newWorkouts.push({
                    date: newDate,
                    workoutDetail: [],
                });
                if (type === "seven-days-workout") {
                    for (const workout of workouts[i]) {
                        newWorkouts[i].workoutDetail.push(workout);
                    }
                } else {
                    for (const workout of workouts) {
                        newWorkouts[i].workoutDetail.push(workout);
                    }
                }
            }
            targetUserWorkout.workouts.push(...newWorkouts);
            await targetUserWorkout.save();
            workoutsForDate = newWorkouts[0];
            const filteredWorkout = fetchWorkoutForSpecificDate(
                targetUserWorkout,
                date
            );

            return NextResponse.json(
                {
                    message: "Workout added",
                    data: filteredWorkout,
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    message: "Not allowed new workout AI generation",
                    data: "You already have a workout plan for today. AI generation works only when you have not achieved workout or no plan at all.",
                },
                { status: 200 }
            );
        }
    } catch (error) {
        console.error("Error while adding workout:", error);
    }
}
