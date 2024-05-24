"use client";

import React from "react";
import SignUpAndInIcon from "@/components/global/icons/SignUpAndInIcon";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { useSignIn } from "@clerk/nextjs";

const routeLoginPostUser = async (userData) => {
    try {
        const newUserData = {
            email: userData.email,
            username: userData.username,
            isLoggedIn: true,
        };
        const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(newUserData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Not OK");
        }
        const data = await response.json();
        window.location.href = "/summary/diet";
        return data;
    } catch (error) {
        console.error(error);
    }
};

type userLoginInput = {
    email: string;
    username: string;
    password: string;
};
const validationSchema = yup.object({
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    password: yup.string().required("Password is required"),
});

export default function LoginForm() {
    const { signIn } = useSignIn();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<userLoginInput>({ resolver: yupResolver(validationSchema) });

    const onSubmit: SubmitHandler<userLoginInput> = async (
        data: userLoginInput
    ) => {
        try {
            const logInResult = await signIn?.create({
                identifier: data.email,
                password: data.password,
            });
            if (logInResult?.status === "complete") {
                routeLoginPostUser(data);
            }
            console.log("User Info: ", logInResult);
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return (
        <form
            className="mx-auto max-w-xs"
            onSubmit={handleSubmit(onSubmit)}
            method="post"
        >
            <div className="">
                <label htmlFor="email" className="hidden">
                    Email
                </label>
                <input
                    className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    id="email"
                    {...register("email", { required: true })}
                />
                {errors.email && (
                    <span className="text-red-500 text-sm">
                        {errors.email.message}
                    </span>
                )}
            </div>
            <div className="mt-2">
                <label htmlFor="password" className="hidden">
                    Password
                </label>
                <input
                    className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder="Password"
                    id="password"
                    {...register("password", { required: true })}
                />
                {errors.password && (
                    <span className="text-red-500 text-sm">
                        {errors.password.message}
                    </span>
                )}
            </div>

            <button
                className="mt-2 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                type="submit"
            >
                <SignUpAndInIcon width={6} />
                <span className="ml-3">Submit</span>
            </button>
        </form>
    );
}
