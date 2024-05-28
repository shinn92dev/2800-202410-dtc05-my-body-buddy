// // pages/api/get-workout.ts

// import { NextRequest, NextResponse } from "next/server";
// import WorkoutModel from "../../../models/Workout";
// import { connectMongoDB } from "@/config/db";

// export async function GET(req: NextRequest) {
//     await connectMongoDB();

//     const { searchParams } = new URL(req.url);
//     const userId = searchParams.get("userId");

//     if (!userId) {
//         return NextResponse.json(
//             { error: "User ID is required" },
//             { status: 400 }
//         );
//     }

//     try {
//         const workouts = await WorkoutModel.findOne({ userId: userId });

//         if (!workouts) {
//             return NextResponse.json(
//                 { error: "No workout data found for this user." },
//                 { status: 404 }
//             );
//         }

//         return NextResponse.json(workouts, { status: 200 });
//     } catch (error) {
//         console.error("Error fetching workout data:", error);
//         return NextResponse.json(
//             { error: "Internal Server Error" },
//             { status: 500 }
//         );
//     }
// }
import { NextRequest, NextResponse } from "next/server";
import WorkoutModel from "../../../models/Workout";
import { connectMongoDB } from "@/config/db";
import { getAuth } from '@clerk/nextjs/server';
import { quartersToMonths } from "date-fns";

export async function GET(req: NextRequest) {
    try {
        const { userId } = getAuth(req);
        const { searchParams } = new URL(req.url);
        const date = searchParams.get('date');

        if (!userId || !date) {
            console.error('Missing userId or date parameter');
            return NextResponse.json({ error: 'Missing userId or date parameter' }, { status: 400 });
        }

        await connectMongoDB();

        const workouts = await WorkoutModel.findOne({ userId});

        if (!workouts) {
            console.log(`No workouts found for userId: ${userId}`);
            return NextResponse.json({
                name: [],
                calories: [],
                unit: [],
                quantity: [],
                achieved: []
            }, { status: 200 });
        }

        const dateObj = new Date(date).toISOString().split('T')[0];
        const dailyWorkout = workouts.workouts.find((d: { date: { toISOString: () => string; }; }) => {
            const workoutDate = d.date.toISOString().split('T')[0];
            return workoutDate === dateObj;
        });

        if (!dailyWorkout) {
            console.log(`No workouts found for date: ${date}`);
            return NextResponse.json({
                name: [],
                calories: [],
                unit: [],
                quantity: [],
                achieved: []
            }, { status: 200 });
        }

        const responseData = JSON.parse(JSON.stringify(dailyWorkout, (key, value) => {
            if (key === '_id' || key === 'userId') {
                return value.toString();
            }
            if (key === 'date') {
                return new Date(value).toISOString();
            }
            return value;
        }));

        return NextResponse.json(responseData, { status: 200 });
    } catch (error) {
        console.error('Error fetching workouts:', error);
        return NextResponse.json({ message: 'Error fetching workouts', error: (error as Error).message }, { status: 500 });
    }
}
