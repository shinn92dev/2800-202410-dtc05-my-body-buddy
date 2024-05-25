// pages/api/signup.ts

import { connectMongoDB } from "@/config/db";
import saveNewUserToMongoDB from "@/app/_helper/saveNewUserToMongoDB";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    try {
        await connectMongoDB();
        const { email, username, isLoggedIn, userId } = await req.json();

        const userData = {
            email: email,
            username: username,
            isLoggedIn: isLoggedIn,
            userId: userId,
        };
        await saveNewUserToMongoDB(userData);
        return NextResponse.json(
            { message: "User data saved successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: "An error occurred",
            },
            { status: 500 }
        );
    }
}
