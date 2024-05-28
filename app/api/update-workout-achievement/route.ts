import { NextResponse } from "next/server";
import WorkoutModel from "@/models/Workout";
import { connectMongoDB } from "@/config/db";

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

            const formattedDate = new Date(date).toISOString().split("T")[0];
            const result = await WorkoutModel.updateOne(
                {
                    userId,
                    "workouts.date": formattedDate,
                    "workouts.workoutDetail.name": name,
                },
                {
                    $set: {
                        "workouts.$.workoutDetail.$[detail].achieved": achieved,
                    },
                },
                { arrayFilters: [{ "detail.name": name }] }
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
