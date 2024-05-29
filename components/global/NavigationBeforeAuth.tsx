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
    <nav className="flex items-center justify-between px-4">
      <button
        className="block"
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

      <div
        className={`fixed top-0 left-0 h-full w-2/3 bg-white border-r border-logo-pumpkin shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
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

        <ul
          className={`text-beige font-bold text-center py-2 px-4 rounded-full m-2 ${
            path === "/login"
              ? "bg-dark-blue hover:bg-dark-blue"
              : "bg-gray-500 hover:bg-gray-700"
          }`}
        >
          <Link href="/login" onClick={toggleHBGmenu}>
            Log In
          </Link>
        </ul>
        <ul
          className={`text-beige font-bold text-center py-2 px-4 rounded-full m-2 ${
            path === "/signup"
              ? "bg-dark-blue hover:bg-dark-blue"
              : "bg-gray-500 hover:bg-gray-700"
          }`}
        >
          <Link href="/signup" onClick={toggleHBGmenu}>
            Sign Up
          </Link>
        </ul>
      </div>

      <div className={`flex-grow text-center ${isOpen ? "blur-sm" : ""}`}>
        <Link href="/">
          <img
            src="/my_body_buddy_logo_transparent.png"
            alt="logo"
            className="h-20 w-20 mx-auto"
          />
        </Link>
      </div>
    </nav>
  );
}
