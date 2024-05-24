import { connectMongoDB } from "@/config/db";
import WorkoutModel from "@/models/Workout";
import { NextResponse } from "next/server";

const updateAchievedStatus = async (
    username: string,
    date: Date,
    title: string,
    status: boolean
) => {
    try {
        await connectMongoDB();
        // UTC 시간 설정
        const formattedDate = new Date(
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
        );

        // const formattedDate = new Date(date);

        formattedDate.setMonth(4);
        console.log("Formatted Date:", formattedDate);
        const foundDocument = await WorkoutModel.findOne({
            username: username,
            "workouts.date": formattedDate,
            "workouts.workoutDetail.title": title,
        });

        console.log("Found Document:", foundDocument);
        // find the specific workout detail to update
        const updated = await WorkoutModel.findOneAndUpdate(
            {
                username: username,
                "workouts.date": formattedDate,
                "workouts.workoutDetail.title": title,
            },
            {
                $set: {
                    "workouts.$.workoutDetail.$[inner].achieved": status,
                },
            },
            {
                arrayFilters: [{ "inner.title": title }],
                new: true, // Return the updated document
            }
        );

        console.log("ROUTE:", updated);
        console.log("Status updated");
    } catch (error) {
        console.log(error);
    }
};

export async function POST(req: any) {
    try {
        const { username, date, title } = await req.json();
        console.log(username, date, title);
        const formattedDate = new Date(date);
        updateAchievedStatus(username, formattedDate, title, false);
        return NextResponse.json({ message: "Connected" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "An error occurred",
            },
            { status: 500 }
        );
    }
}
