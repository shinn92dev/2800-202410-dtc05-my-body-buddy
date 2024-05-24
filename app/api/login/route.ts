import saveNewUserToMongoDB from "@/app/_helper/saveNewUserToMongoDB";
import { connectMongoDB } from "@/config/db";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    try {
        await connectMongoDB();
        const { email, username, isLoggedIn } = await req.json();
        const user = await UserModel.findOneAndUpdate(
            { email: email },
            { isLoggedIn: true },
            { new: true }
        );
        console.log(user);
        return NextResponse.json(
            { message: "User logged in successfully" },
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
