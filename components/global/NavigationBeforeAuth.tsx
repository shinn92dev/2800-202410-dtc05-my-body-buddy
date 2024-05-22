"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function NavigationBeforeAuth() {
    const path = usePathname();
    const tempUserId: string = "Anthony";
    console.log(path);
    const [isOpen, setIsOpen] = useState(false);
    const toggleHBGmenu = () => setIsOpen(!isOpen);
    console.log(path);

    return (
        <nav className="flex items-center">
            <button
                className="block lg:hidden ml-4"
                onClick={toggleHBGmenu}
                aria-label="Toggle menu"
            >
                <svg
                    className="h-10 w-10 fill-current text-logo-pumpkin"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            <ul
                className={`flex-col flex-wrap ${
                    isOpen ? "block" : "hidden"
                } lg:flex`}
            >
                <li
                    className={`text-beige font-bold text-center py-2 px-4 rounded-full m-2 ${
                        path === "/"
                            ? "bg-dark-blue hover:bg-dark-blue"
                            : "bg-gray-500 hover:bg-gray-700"
                    }`}
                >
                    <Link href="/">Home</Link>
                </li>
                <li
                    className={`text-beige font-bold text-center py-2 px-4 rounded-full m-2 ${
                        path === "/sign-in"
                            ? "bg-dark-blue hover:bg-dark-blue"
                            : "bg-gray-500 hover:bg-gray-700"
                    }`}
                >
                    <Link href="/sign-in">Sign In</Link>
                </li>
                <li
                    className={`text-beige font-bold text-center py-2 px-4 rounded-full m-2 ${
                        path === "/sign-up"
                            ? "bg-dark-blue hover:bg-dark-blue"
                            : "bg-gray-500 hover:bg-gray-700"
                    }`}
                >
                    <Link href="/sign-up">Sign Up</Link>
                </li>
            </ul>

            <div className="flex justify-center items-center">
                <img
                    src="/my_body_buddy_logo_transparent.png"
                    alt="logo"
                    className="h-20 w-20"
                />
            </div>
        </nav>
    );
}
