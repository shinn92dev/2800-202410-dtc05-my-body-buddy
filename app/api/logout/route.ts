import { connectMongoDB } from "@/config/db";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    try {
        await connectMongoDB();
        const { email } = await req.json();
        console.log(email);
        const user = await UserModel.findOneAndUpdate(
            { email: email },
            { isLoggedIn: false },
            { new: true }
        );
        console.log("USER!!! ", user);
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { message: "User logged out successfully" },
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
