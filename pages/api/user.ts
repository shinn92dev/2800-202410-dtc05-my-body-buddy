import { getAuth } from "@clerk/nextjs/server";
import UserModel from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userDataMongo = await UserModel.findOne({ clerkId: userId });

    if (!userDataMongo) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(userDataMongo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
