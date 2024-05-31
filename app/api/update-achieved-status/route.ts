import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "@/config/db";
import WorkoutModel from "@/models/Workout";
import { getAuth } from "@clerk/nextjs/server";

const updateAchievedStatus = async (
    userId: string,
    date: Date,
    title: string,
    status: boolean
) => {
    try {
        await connectMongoDB();
        const formattedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

        const updated = await WorkoutModel.findOneAndUpdate(
            {
                userId: userId,
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
                new: true,
            }
        );

        return updated;
    } catch (error) {
        console.error(error);
        throw new Error("Status update failed");
    }
};

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const { date, title, status } = req.body;
        const formattedDate = new Date(date);
        const result = await updateAchievedStatus(userId, formattedDate, title, status);
        
        res.status(200).json({ message: "Connected", result });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error });
    }
}
