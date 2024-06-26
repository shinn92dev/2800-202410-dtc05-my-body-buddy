"use client";

import React, { useEffect, useState } from "react";
import SignUpAndInIcon from "@/components/global/icons/SignUpAndInIcon";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignUp } from "@clerk/nextjs";
import axios from "axios";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import Modal from "@/components/global/Modal";

import PolicyContent from "@/components/global/PolicyContent";

const createNewUser = async (userData: any, retries = 3): Promise<any> => {
    try {
        const response = await axios.post("/api/signup", userData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status !== 200) {
            console.error("Error Response: ", response.data);
            throw new Error("Not OK");
        }
        window.location.href = "/summary/diet";

        return response.data;
    } catch (error) {
        if (
            axios.isAxiosError(error) &&
            error.response?.status === 429 &&
            retries > 0
        ) {
            console.warn(`Retrying... (${3 - retries + 1}/3)`);
            await new Promise((resolve) =>
                setTimeout(resolve, 1000 * (4 - retries))
            );
            return createNewUser(userData, retries - 1);
        }
        console.error("Error in createNewUser: ", error);
        throw error;
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
        .min(8, "Password must be at least 8 characters")
        .max(30, "Password must be less than 30 characters")
        .required("Password is required"),
});

export default function SignupForm() {
    const { signUp } = useSignUp();
    const [loading, setLoading] = useState(true);
    const [signUpErrors, setSignUpErrors] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const onClick = () => {
        setShowModal((curr) => !curr);
    };
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<newUserInputs>({
        resolver: yupResolver(validationSchema) as unknown as Resolver<
            newUserInputs,
            any
        >,
    });

    useEffect(() => {
        // Setting loading to false once the component mounts
        const handleLoad = () => setLoading(false);

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

    const onSubmit: SubmitHandler<newUserInputs> = async (
        data: newUserInputs
    ) => {
        try {
            const signUpResult = await signUp?.create({
                emailAddress: data.email,
                username: data.username,
                password: data.password,
            });

            setSignUpErrors(null); // clear previous errors

            if (signUpResult?.status === "complete") {
                const userId = signUpResult.createdUserId;
                const userData = {
                    email: data.email,
                    username: data.username,
                    isLoggedIn: true,
                    userId: userId,
                };
                await createNewUser(userData);
            } else {
                console.error("Sign Up Incomplete: ", signUpResult);
            }
        } catch (error: any) {
            if (isClerkAPIResponseError(error)) {
                const errorMessage = error.errors[0]?.message;
                if (
                    errorMessage ===
                    "That username is taken. Please try another."
                ) {
                    setSignUpErrors(errorMessage);
                } else {
                    setSignUpErrors(
                        "An unexpected error occurred. Please try again."
                    );
                }
            } else {
                setSignUpErrors(
                    "An unexpected error occurred. Please try again."
                );
            }
            console.error("Error: ", error);
        }
    };

    if (loading) {
        return (
            <div className="mt-8 flex flex-row justify-center">
                Page is loading...
                <svg
                    className="ml-1 animate-spin h-5 w-5 mr-3 text-logo-pumpkin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                </svg>
            </div>
        );
    }

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
                <div className="text-dark-blue pt-2 pb-2 text-sm">
                    Password should be:
                    <br />
                    <li>at least 8 characters</li>
                    <li>not contain same characters in a row (aaa) </li>
                    <li>not consecutive characters (abcde) </li>
                    <li>not contain same characters with email or username </li>
                </div>
            </div>

            {signUpErrors && (
                <div className="mt-2 text-red-500 text-sm">
                    {signUpErrors.split("\n").map((message, index) => (
                        <p key={index}>{message}</p>
                    ))}
                </div>
            )}
            <p className="text-gray-400">
                By clicking the &quot;Sign Up&quot; button, you agree to
                our&nbsp;
                <span
                    className="hover:underline cursor-pointer font-bold"
                    onClick={onClick}
                >
                    Privacy Policy
                </span>
                .
            </p>

            <div
                className={`${
                    showModal ? "" : "hidden"
                } fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto`}
            >
                <Modal
                    title="Term of Policy"
                    modalContent={<PolicyContent />}
                    setShowModal={onClick}
                />
            </div>

            <button
                className="mt-2 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                type="submit"
                disabled={isSubmitting}
            >
                <div className="flex items-center justify-center">
                    <SignUpAndInIcon width={6} />
                    <span className="ml-3">
                        {isSubmitting ? (
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                        ) : (
                            "Sign Up"
                        )}
                    </span>
                </div>
            </button>
        </form>
    );
}
