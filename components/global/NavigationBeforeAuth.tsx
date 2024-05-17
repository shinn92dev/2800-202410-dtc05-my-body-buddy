"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationBeforeAuth() {
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
                    <Link href="/">Home</Link>
                </li>
                <li
                    className={`text-white font-bold py-2 px-4 rounded-full m-2 ${
                        path === "/sign-in"
                            ? "bg-blue-500 hover:bg-blue-700"
                            : "bg-gray-500 hover:bg-gray-700"
                    }`}
                >
                    <Link href="/sign-in">login</Link>
                </li>
                <li
                    className={`text-white font-bold py-2 px-4 rounded-full m-2 ${
                        path === "/sign-up"
                            ? "bg-blue-500 hover:bg-blue-700"
                            : "bg-gray-500 hover:bg-gray-700"
                    }`}
                >
                    <Link href="/sign-up">signup</Link>
                </li>
            </ul>
        </nav>
    );
}
