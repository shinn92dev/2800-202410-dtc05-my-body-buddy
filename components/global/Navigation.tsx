"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const path = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const toggleHBGmenu = () => setIsOpen(!isOpen);

  const tempUserId: string = "Anthony";
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
        className={`flex-col flex-wrap ${isOpen ? "block" : "hidden"} lg:flex`}
      >
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
