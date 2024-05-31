"use client";
import React, { useState } from "react";
import { useAuth, useSignIn } from "@clerk/nextjs";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ForgotPasswordPage: NextPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const [secondFactor, setSecondFactor] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();
    const { isSignedIn } = useAuth();
    const { isLoaded, signIn, setActive } = useSignIn();

    if (!isLoaded) {
        return null;
    }

    if (isSignedIn) {
        router.push("/");
    }

    async function create(e: React.FormEvent) {
        e.preventDefault();
        await signIn
            ?.create({
                strategy: "reset_password_email_code",
                identifier: email,
            })
            .then((_) => {
                setSuccessfulCreation(true);
                setError("");
            })
            .catch((err) => {
                console.error("error", err.errors[0].longMessage);
                setError(err.errors[0].longMessage);
            });
    }

    async function reset(e: React.FormEvent) {
        e.preventDefault();
        await signIn
            ?.attemptFirstFactor({
                strategy: "reset_password_email_code",
                code,
                password,
            })
            .then((result) => {
                if (result.status === "needs_second_factor") {
                    setSecondFactor(true);
                    setError("");
                } else if (result.status === "complete") {
                    setActive({ session: result.createdSessionId });
                    setError("");
                    window.location.href = "/";
                } else {
                    console.log(result);
                }
            })
            .catch((err) => {
                console.error("error", err.errors[0].longMessage);
                setError(err.errors[0].longMessage);
            });
    }

    return (
        <div
            style={{
                margin: "auto",
                maxWidth: "500px",
            }}
            className="p-5"
        >
            <h1 className="font-extrabold text-3xl p-2">Forgot Password?</h1>
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1em",
                }}
                onSubmit={!successfulCreation ? create : reset}
                className="p-2"
            >
                {!successfulCreation && (
                    <>
                        <label htmlFor="email">
                            Please provide your email address
                        </label>
                        <input
                            type="email"
                            placeholder="e.g john@doe.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 pl-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        />

                        <button className="text-beige font-bold text-center py-1 px-3 rounded-full m-2 bg-gray-500 hover:bg-gray-700">
                            Send password reset code
                        </button>
                        {error && (
                            <div className="flex flex-col items-center">
                                <p className="text-center text-red-500">
                                    {error}
                                </p>
                                {error === "Couldn't find your account." ? (
                                    <div className="flex flex-col items-center">
                                        <p>
                                            Join us by clicking the button
                                            below✨
                                        </p>
                                        <Link
                                            href="/signup"
                                            className="text-beige font-bold text-center py-1 px-3 rounded-full m-2 bg-gray-500 hover:bg-gray-700"
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        )}
                    </>
                )}

                {successfulCreation && (
                    <>
                        <label htmlFor="password">
                            Enter your new password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <label htmlFor="password">
                            Enter the password reset code that was sent to your
                            email
                        </label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />

                        <button>Reset</button>
                        {error && <p>{error}</p>}
                    </>
                )}

                {secondFactor && (
                    <p>2FA is required, but this UI does not handle that</p>
                )}
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
