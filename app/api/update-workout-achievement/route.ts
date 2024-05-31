import { NextResponse } from "next/server";
import WorkoutModel from "@/models/Workout";
import { connectMongoDB } from "@/config/db";
import { Workout } from "@/config/types";
const stripTimeFromDate = (date: Date) => {
    const d = new Date(date);
    d.setUTCHours(0, 0, 0, 0);
    return d;
};

export async function POST(req: any) {
    // console.log("BODY:", req.body);
    // return NextResponse.json({ message: "HELLO" }, { status: 200 });
    if (req.method === "POST") {
        const body = await req.json();
        const { userId, date, name, achieved } = body;
        // console.log(await req.json());
        console.log(userId, date, name, achieved);
        try {
            await connectMongoDB();

            const formattedDate = stripTimeFromDate(new Date(date));

            const fetched = await WorkoutModel.findOne({ userId: userId });
            if (!fetched) {
                return NextResponse.json(
                    { message: "Workout not found" },
                    { status: 404 }
                );
            }

            const workoutForDate = fetched.workouts.find((workout: Workout) => {
                const workoutDate = stripTimeFromDate(new Date(workout.date));
                return workoutDate.getTime() === formattedDate.getTime();
            });

            if (!workoutForDate) {
                return NextResponse.json(
                    { message: "Workout for the specified date not found" },
                    { status: 404 }
                );
            }

            const workoutIndex = fetched.workouts.findIndex(
                (workout: Workout) => {
                    const workoutDate = stripTimeFromDate(
                        new Date(workout.date)
                    );
                    return workoutDate.getTime() === formattedDate.getTime();
                }
            );

            const result = await WorkoutModel.updateOne(
                {
                    userId,
                    [`workouts.${workoutIndex}.workoutDetail.name`]: name,
                },
                {
                    $set: {
                        [`workouts.${workoutIndex}.workoutDetail.$[detail].achieved`]:
                            achieved,
                    },
                },
                {
                    arrayFilters: [{ "detail.name": name }],
                }
            );

            console.log("######################");
            console.log(result);
            console.log("######################");
            if (!result) {
                return NextResponse.json(
                    { message: "Workout not found" },
                    { status: 404 }
                );
            }
            return NextResponse.json({ message: result }, { status: 200 });
        } catch (error) {
            console.error(error);
            return NextResponse.json(
                { message: "Failed to update workout status" },
                { status: 500 }
            );
        }
    } else {
        return NextResponse.json(
            { message: "Method not allowed" },
            { status: 405 }
        );
    }
}
