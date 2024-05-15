"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
    const path = usePathname();
    const tempUserId: string = "Anthony";
    console.log(path);
    return (
        <nav>
            <ul className="flex flex-wrap">
                <li
                    className={`text-white font-bold py-2 px-4 rounded-full m-2 ${
                        path === "/"
                            ? "bg-blue-500 hover:bg-blue-700"
                            : "bg-gray-500 hover:bg-gray-700"
                    }`}
                >
                    <Link href="/public">Home</Link>
                </li>
                <li
                    className={`text-white font-bold py-2 px-4 rounded-full m-2 ${
                        path === "/login"
                            ? "bg-blue-500 hover:bg-blue-700"
                            : "bg-gray-500 hover:bg-gray-700"
                    }`}
                >
                    <Link href="/login">login</Link>
                </li>
                <li
                    className={`text-white font-bold py-2 px-4 rounded-full m-2 ${
                        path === "/signup"
                            ? "bg-blue-500 hover:bg-blue-700"
                            : "bg-gray-500 hover:bg-gray-700"
                    }`}
                >
                    <Link href="/signup">signup</Link>
                </li>
                <li
                    className={`text-white font-bold py-2 px-4 rounded-full m-2 ${
                        path === "/plan/diet"
                            ? "bg-blue-500 hover:bg-blue-700"
                            : "bg-gray-500 hover:bg-gray-700"
                    }`}
                >
                    <Link href="/plan/diet">Diet Plan</Link>
                </li>

                <li
                    className={`text-white font-bold py-2 px-4 rounded-full m-2 ${
                        path === "/plan/workout"
                            ? "bg-blue-500 hover:bg-blue-700"
                            : "bg-gray-500 hover:bg-gray-700"
                    }`}
                >
                    <Link href="/plan/workout">Workout Plan</Link>
                </li>
                <li
                    className={`text-white font-bold py-2 px-4 rounded-full m-2 ${
                        path === "/summary/diet"
                            ? "bg-blue-500 hover:bg-blue-700"
                            : "bg-gray-500 hover:bg-gray-700"
                    }`}
                >
                    <Link href="/summary/diet">Diet Summary</Link>
                </li>
                <li
                    className={`text-white font-bold py-2 px-4 rounded-full m-2 ${
                        path === "/summary/workout"
                            ? "bg-blue-500 hover:bg-blue-700"
                            : "bg-gray-500 hover:bg-gray-700"
                    }`}
                >
                    <Link href="/summary/workout">Workout Summary</Link>
                </li>
                <li
                    className={`text-white font-bold py-2 px-4 rounded-full m-2 ${
                        path === `/user/${tempUserId}`
                            ? "bg-blue-500 hover:bg-blue-700"
                            : "bg-gray-500 hover:bg-gray-700"
                    }`}
                >
                    <Link href={`/user/${tempUserId}`}>User</Link>
                </li>
                <li
                    className={`text-white font-bold py-2 px-4 rounded-full m-2 ${
                        path === `/user/${tempUserId}/edit`
                            ? "bg-blue-500 hover:bg-blue-700"
                            : "bg-gray-500 hover:bg-gray-700"
                    }`}
                >
                    <Link href={`/user/${tempUserId}/edit`}>User Edit</Link>
                </li>
                <li
                    className={`text-white font-bold py-2 px-4 rounded-full m-2 ${
                        path === `/user/${tempUserId}/edit/goal`
                            ? "bg-blue-500 hover:bg-blue-700"
                            : "bg-gray-500 hover:bg-gray-700"
                    }`}
                >
                    <Link href={`/user/${tempUserId}/edit/goal`}>
                        Goal Edit
                    </Link>
                </li>
                <li
                    className={`text-white font-bold py-2 px-4 rounded-full m-2 ${
                        path === `/user/${tempUserId}/edit/goal/workout`
                            ? "bg-blue-500 hover:bg-blue-700"
                            : "bg-gray-500 hover:bg-gray-700"
                    }`}
                >
                    <Link href={`/user/${tempUserId}/edit/goal/workout`}>
                        Workout Goal Edit
                    </Link>
                </li>
                <li
                    className={`text-white font-bold py-2 px-4 rounded-full m-2 ${
                        path === `/user/${tempUserId}/edit/goal/diet`
                            ? "bg-blue-500 hover:bg-blue-700"
                            : "bg-gray-500 hover:bg-gray-700"
                    }`}
                >
                    <Link href={`/user/${tempUserId}/edit/goal/diet`}>
                        Diet Goal Edit
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
