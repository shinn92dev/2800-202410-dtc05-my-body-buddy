"use client";

import React from "react";
import InputBox from "@/components/global/InputBox";
import SignUpAndInIcon from "@/components/global/icons/SignUpAndInIcon";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
    // const [state, action] = useActionState(signup, undefined);
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [errors, setErrors] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    username,
                    password,
                    securityQuestion,
                    securityAnswer,
                }),
            });
            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/");
            } else {
                const data = await res.json();
                console.log(data.message.name);
                if (data.message.name === "ZodError") {
                    const newError = {};
                    for (let i = 0; i < data.message.issues.length; i++) {
                        const error = data.message.issues[i];
                        const path = error.path[0];
                        const message = error.message;
                        if (!newError[path]) {
                            newError[path] = message;
                        } else {
                            continue;
                        }
                    }
                    console.log(newError);
                    setErrors(newError);
                } else {
                    setErrors(data.message);
                }
                console.log(errors);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <form
            className="mx-auto max-w-xs"
            onSubmit={handleSubmit}
            method="post"
        >
            <InputBox
                labelText="Email"
                id="email"
                hidden={true}
                type="email"
                placeholder="Email"
                isTop={true}
                onChangeFn={(e) => setEmail(e.target.value)}
            />
            {/* {state?.errors?.email && (
                <p className="text-red-700">{`⚠️${state.errors.email}`}</p>
            )} */}
            {errors && (
                <p className="text-red-700">
                    {errors.email && `⚠️${errors.email}`}
                </p>
            )}
            {/* Username */}

            <InputBox
                labelText="Username"
                id="username"
                hidden={true}
                type="text"
                placeholder="Username"
                isTop={false}
                onChangeFn={(e) => setUsername(e.target.value)}
            />
            {errors && (
                <p className="text-red-700">
                    {errors.username && `⚠️${errors.username}`}
                </p>
            )}
            <InputBox
                labelText="Password"
                id="password"
                hidden={true}
                type="password"
                placeholder="Password"
                isTop={false}
                onChangeFn={(e) => setPassword(e.target.value)}
            />
            {errors && (
                <p className="text-red-700">
                    {errors.password && `⚠️${errors.password}`}
                </p>
            )}
            <InputBox
                labelText="Security Question"
                id="security-question"
                hidden={true}
                type="text"
                placeholder="Your security question"
                isTop={false}
                onChangeFn={(e) => setSecurityQuestion(e.target.value)}
            />
            {errors && (
                <p className="text-red-700">
                    {errors.securityQuestion && `⚠️${errors.securityQuestion}`}
                </p>
            )}
            <InputBox
                labelText="Security Answer"
                id="security-answer"
                hidden={true}
                type="text"
                placeholder="answer"
                isTop={false}
                onChangeFn={(e) => setSecurityAnswer(e.target.value)}
            />
            {errors && (
                <p className="text-red-700">
                    {errors.securityAnswer && `⚠️${errors.securityAnswer}`}
                </p>
            )}
            <p className="mt-6 text-xs text-gray-600 text-center">
                I agree to abide by My Body Buddy&apos;s&nbsp;
                <button
                    className="border-b border-gray-500 border-dotted"
                    type="button"
                    // onClick={handlePolicyClick}
                >
                    Terms of Service and privacy Policy
                </button>
            </p>
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
                <span className="ml-3">Go to Next Step</span>
            </button>
        </form>
        // <form onSubmit={handleSubmit(onSubmit)}>
        //     <input {...register("firstName", { required: true })} />
        //     {errors.firstName && <span>This field is required</span>}

        //     <input {...register("lastName")} />

        //     <button type="submit">Submit</button>
        // </form>
    );
}
