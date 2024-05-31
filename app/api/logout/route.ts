import { connectMongoDB } from "@/config/db";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    try {
        // Connect to MongoDB
        await connectMongoDB();
        // Parse the request body to get the email
        const { email } = await req.json();
        console.log(email);
        // Find the user by email
        const user = await UserModel.findOneAndUpdate(
            { email: email },
            { new: true }
        );
        // If user not found, return a 404 response
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        // Return a success response
        return NextResponse.json(
            { message: "User logged out successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        // Return an error response
        return NextResponse.json(
            {
                message: "An error occurred",
            },
            { status: 500 }
        );
    }
}
