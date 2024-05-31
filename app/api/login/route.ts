import { connectMongoDB } from "@/config/db";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    try {
        // Connect to MongoDB
        await connectMongoDB();
        // Parse the request body to get the email
        const { email } = await req.json();
        // Find the user by email and update (if any updates are needed, otherwise just find)
        const user = await UserModel.findOneAndUpdate(
            { email: email },
            { new: true }
        );
        console.log(user);
        // Return a success response
        return NextResponse.json(
            { message: "User logged in successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: "An error occurred during login",
            },
            { status: 500 }
        );
    }
}
