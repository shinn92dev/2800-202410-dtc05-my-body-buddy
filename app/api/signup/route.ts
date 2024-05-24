import saveNewUserToMongoDB from "@/app/_helper/saveNewUserToMongoDB";
import { connectMongoDB } from "@/config/db";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    try {
        await connectMongoDB();
        const { email, username, isLoggedIn } = await req.json();

        console.log(email, username, isLoggedIn);
        const userData = {
            email: email,
            username: username,
            isLoggedIn: isLoggedIn,
        };
        saveNewUserToMongoDB(userData);
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
