import checkDuplicatedUser from "@/app/_helper/checkDuplicateUser";
import validateUserInformation from "@/app/_helper/validateSignupInput";
import UsersModel from "@/models/Users";
import { NextResponse } from "next/server";
import { SignJWT } from "jose";
const bcrypt = require("bcrypt");
import { setCookie } from "cookie";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function POST(req: any) {
    try {
        const { email, username, password, securityQuestion, securityAnswer } =
            await req.json();

        console.log(
            email,
            username,
            password,
            securityQuestion,
            securityAnswer
        );
        const isCorrectInput = validateUserInformation(
            email,
            username,
            password,
            securityQuestion,
            securityAnswer
        );

        if (!isCorrectInput.success) {
            return NextResponse.json(
                { message: isCorrectInput.error },
                { status: 409 }
            );
        }
        const isDuplicatedUser = await checkDuplicatedUser(email, username);
        if (isDuplicatedUser.isDuplicatedUser) {
            return NextResponse.json(
                { message: isDuplicatedUser.errorMessages },
                { status: 409 }
            );
        }
        const newUser = new UsersModel({
            username: username,
            email: email,
            password: await bcrypt.hashSync(password, 10),
            securityQuestion: securityQuestion,
            securityAnswer: bcrypt.hashSync(securityAnswer, 10),
        });
        newUser.save().then((result) => {
            console.log(result);
        });

        const userData = {
            username: username,
            email: email,
        };
        const userSessionData = JSON.stringify(userData);
        const sessionCookie = setCookie("session", userSessionData, {
            httpOnly: true,
            sameSite: "strict",
        });

        return NextResponse.json(
            { message: "User registered" },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: "An error occured",
            },
            { status: 500 }
        );
    }
}
