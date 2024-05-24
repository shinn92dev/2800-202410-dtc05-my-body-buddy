"use client";

import React from "react";
import SignUpAndInIcon from "@/components/global/icons/SignUpAndInIcon";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { useSignUp } from "@clerk/nextjs";
import { connectMongoDB } from "@/config/db";

const createNewUser = async (userData: any) => {
    try {
        const newUserData = {
            email: userData.email,
            username: userData.username,
            isLoggedIn: true,
        };
        const response = await fetch("/api/signup", {
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

type newUserInputs = {
    email: string;
    username: string;
    password: string;
};
const validationSchema = yup.object({
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    username: yup
        .string()
        .min(5, "Username must be at least 5 characters")
        .max(20, "Username must be less than 20 characters")
        .required("Username is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            "Password must contain uppercase, lowercase, number and special symbol"
        ),
});

export default function SignupForm() {
    const { signUp } = useSignUp();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<newUserInputs>({
        resolver: yupResolver(validationSchema) as unknown as Resolver<
            newUserInputs,
            any
        >,
    });

    const onSubmit: SubmitHandler<newUserInputs> = async (
        data: newUserInputs
    ) => {
        try {
            const signUpResult = await signUp?.create({
                emailAddress: data.email,
                username: data.username,
                password: data.password,
            });
            if (signUpResult?.status === "complete") {
                console.log("User Info: ", signUpResult);
                createNewUser(data);
            }
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
                <label htmlFor="username" className="hidden">
                    Username
                </label>
                <input
                    className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Username"
                    id="username"
                    {...register("username", { required: true })}
                />
                {errors.username && (
                    <span className="text-red-500 text-sm">
                        {errors.username.message}
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
                {/* <svg
                                                className={`w-6 h-6 -ml-2`}
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                <circle cx="8.5" cy="7" r="4" />
                                                <path d="M20 8v6M23 11h-6" />
                                            </svg> */}
                <span className="ml-3">Submit</span>
            </button>
        </form>
    );
}
