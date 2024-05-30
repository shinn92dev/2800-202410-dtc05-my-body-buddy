import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "@/config/db";
import WorkoutModel from "@/models/Workout";
import { getAuth } from "@clerk/nextjs/server";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    switch (method) {
        case "GET":
            return await getWorkout(req, res);
        case "POST":
            return await updateWorkout(req, res);
        case "PUT":
            return await createWorkout(req, res);
        default:
            res.setHeader("Allow", ["GET", "POST", "PUT"]);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
};

const getWorkout = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        await connectMongoDB();
        let workoutData = await WorkoutModel.findOne({ userId });

        if (!workoutData) {
            workoutData = await WorkoutModel.create({ userId, workouts: [] });
        }

        return res.status(200).json(workoutData);
    } catch (error) {
        console.error("Error fetching workout data:", error);
        return res
            .status(500)
            .json({
                message: "Internal Server Error",
                error: (error as Error).message,
            });
    }
};

const updateWorkout = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const { date, title, status } = req.body;
        const formattedDate = new Date(date);

        await connectMongoDB();
        const updated = await WorkoutModel.findOneAndUpdate(
            {
                userId,
                "workouts.date": formattedDate,
                "workouts.workoutDetail.title": title,
            },
            { $set: { "workouts.$.workoutDetail.$[inner].achieved": status } },
            { arrayFilters: [{ "inner.title": title }], new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Workout not found" });
        }

        return res
            .status(200)
            .json({ message: "Workout updated successfully", updated });
    } catch (error) {
        console.error("Error updating workout data:", error);
        return res
            .status(500)
            .json({
                message: "Internal Server Error",
                error: (error as Error).message,
            });
    }
};

const createWorkout = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const { workouts } = req.body;

        await connectMongoDB();
        const newWorkout = await WorkoutModel.create({ userId, workouts });

        return res.status(201).json(newWorkout);
    } catch (error) {
        console.error("Error creating new workout data:", error);
        return res
            .status(500)
            .json({
                message: "Internal Server Error",
                error: (error as Error).message,
            });
    }
};

export { handler as GET, handler as POST, handler as PUT };
