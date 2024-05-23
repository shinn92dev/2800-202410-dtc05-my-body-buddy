"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function NavigationBeforeAuth() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggleHBGmenu = () => setIsOpen(!isOpen);
  console.log(path);

  return (
    <nav className="flex items-center">
      <button
        className="block ml-4"
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
        className={`absolute left-1 top-1 w-1/3 bg-white border border-logo-pumpkin shadow-lg rounded-md ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <button onClick={toggleHBGmenu}>
          <svg
            className="mt-3 h-10 w-10 fill-current text-logo-pumpkin"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>

        <li
          className={`text-beige font-bold text-center py-2 px-4 rounded-full m-2 ${
            path === "/login"
              ? "bg-dark-blue hover:bg-dark-blue"
              : "bg-gray-500 hover:bg-gray-700"
          }`}
        >
          <Link href="/login" onClick={toggleHBGmenu}>
            Sign In
          </Link>
        </li>
        <li
          className={`text-beige font-bold text-center py-2 px-4 rounded-full m-2 ${
            path === "/signup"
              ? "bg-dark-blue hover:bg-dark-blue"
              : "bg-gray-500 hover:bg-gray-700"
          }`}
        >
          <Link href="/signup" onClick={toggleHBGmenu}>
            Sign Up
          </Link>
        </li>
      </ul>
      <Link className="absolute right-1/2" href="/">
        <img
          src="/my_body_buddy_logo_transparent.png"
          alt="logo"
          className="h-20 w-20"
        />
      </Link>
    </nav>
  );
}
