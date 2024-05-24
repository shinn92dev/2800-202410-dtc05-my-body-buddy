import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "@/config/db";
import UserModel from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await connectMongoDB();

  const { name, age, gender, height, weight, goalWeight, goalDay, goalCal } =
    req.body;

  try {
    const user = await UserModel.findOneAndUpdate(
      { username: name },
      { age, gender, height, weight, goalWeight, goalDay, goalCal },
      { new: true, upsert: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User data updated successfully", user });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
