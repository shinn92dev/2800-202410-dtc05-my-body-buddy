import { connectMongoDB } from "@/config/db";
import saveNewUserToMongoDB from "@/app/_helper/saveNewUserToMongoDB";
import { NextResponse } from "next/server";
import UserModel from "@/models/User";

export async function POST(req: any) {
    try {
        // Connect to MongoDB
        await connectMongoDB();
        // Parse the request body to get user details
        const { email, username, isLoggedIn, userId } = await req.json();

        // Check if a user with the same username already exists
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return NextResponse.json(
                { message: "Username already exists" },
                { status: 409 }
            );
        }

        // Create a new user object with the provided details
        const userData = {
            email: email,
            username: username,
            isLoggedIn: isLoggedIn,
            userId: userId,
        };
        // Save the new user to the database
        await saveNewUserToMongoDB(userData);
        // Return a success response
        return NextResponse.json(
            { message: "User data saved successfully" },
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
