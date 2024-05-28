import { NextResponse } from "next/server";
import WorkoutModel from "@/models/Workout";
import { connectMongoDB } from "@/config/db";
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

            const fformattedDate = stripTimeFromDate(new Date(date));
            const formattedDate = new Date(
                Date.UTC(
                    fformattedDate.getFullYear(),
                    fformattedDate.getMonth(),
                    fformattedDate.getDate() + 1
                )
            );
            const fetched = await WorkoutModel.findOne({ userId: userId });
            console.log("Date From DB", fetched.workouts[2].date);
            console.log("Date From User", formattedDate);
            console.log(
                "Date matches",
                fetched.workouts[2].date == formattedDate
            );

            const result = await WorkoutModel.updateOne(
                {
                    userId,
                    workouts: {
                        $elemMatch: {
                            date: {
                                $gte: new Date(
                                    formattedDate.getFullYear(),
                                    formattedDate.getMonth(),
                                    formattedDate.getDate()
                                ),
                                $lt: new Date(
                                    formattedDate.getFullYear(),
                                    formattedDate.getMonth(),
                                    formattedDate.getDate()
                                ),
                            },
                            "workoutDetail.name": name,
                        },
                    },
                },
                {
                    $set: {
                        "workouts.$[].workoutDetail.$[detail].achieved":
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
