import { NextResponse } from "next/server";
import WorkoutModel from "@/models/Workout";
import { auth } from "@clerk/nextjs/server";
import { connectMongoDB } from "@/config/db";
import { filterWorkoutForSpecificDate } from "@/app/_helper/workout";
import { Workout } from "@/config/types";

export async function POST(req: any) {
    await connectMongoDB();
    try {
        const data = await req.json();
        const { date, workouts, type } = data.params;
        const { userId } = auth();

        if (!userId || !date || !workouts || !type) {
            return NextResponse.json(
                { message: "Missing required parameters" },
                { status: 400 }
            );
        }

        const [year, month, day] = date.split("-").map(Number);
        const formattedDate = new Date(Date.UTC(year, month - 1, day));
        if (type === "add-achieved-workout") {
            // Check if the user's data is found
            let targetUserWorkout = await WorkoutModel.findOne({
                userId,
            });

            if (!targetUserWorkout) {
                // Create new user workout if not found
                targetUserWorkout = new WorkoutModel({ userId, workouts: [] });
                await targetUserWorkout.save();
            }

            let workoutsForDate = targetUserWorkout.workouts.find(
                (workout: Workout) =>
                    workout.date.getTime() === formattedDate.getTime()
            );

            if (!workoutsForDate) {
                const newWorkouts = [];
                for (let i = 0; i < 7; i++) {
                    const newDate = new Date(formattedDate);
                    newDate.setUTCDate(formattedDate.getUTCDate() + i);
                    newWorkouts.push({
                        date: newDate,
                        workoutDetail: [],
                    });
                }
                targetUserWorkout.workouts.push(...newWorkouts);
                await targetUserWorkout.save();
                workoutsForDate = newWorkouts[0];
            }

            const workoutIndex = targetUserWorkout.workouts.findIndex(
                (workout: Workout) =>
                    workout.date.getTime() === formattedDate.getTime()
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
        } else if (type === "seven-days-workout") {
            // Check if the user's data is found
            let targetUserWorkout = await WorkoutModel.findOne({
                userId,
            });

            if (!targetUserWorkout) {
                // Create new user workout if not found
                targetUserWorkout = new WorkoutModel({ userId, workouts: [] });
                await targetUserWorkout.save();
            }
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

                    for (const workout of workouts[i]) {
                        newWorkouts[i].workoutDetail.push(workout);
                    }
                }
                targetUserWorkout.workouts.push(...newWorkouts);
                await targetUserWorkout.save();
                workoutsForDate = newWorkouts[0];
                const filteredWorkout = filterWorkoutForSpecificDate(
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
        } else {
            return NextResponse.json(
                { message: "Incorrect Type" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error while adding workout:", error);
    }
}
