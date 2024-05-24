"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./signOutButton";
import { useState, useRef, useEffect } from "react";
import { getCurrentUserInformationFromMondoDB } from "@/app/_helper/getCurrentUserInformation";

export default function Navigation() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggleHBGmenu = () => setIsOpen(!isOpen);

  const [isHide, setIsHide] = useState(false);
  const [isDance, setIsDance] = useState(false);
  const [isBounce, setIsBounce] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const clickCountRef = useRef(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // const currentUserId = await getCurrentUserInformationFromMondoDB().username;

  useEffect(() => {
    async function fetchUser() {
      const userData = await getCurrentUserInformationFromMondoDB();
      if (userData) {
        setCurrentUserId(userData.username);
      }
    }
    fetchUser();
  }, []);

  const handleLogoClick = () => {
    clickCountRef.current += 1;

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    clickTimeoutRef.current = setTimeout(() => {
      if (clickCountRef.current === 2) {
        setIsDance(true);
        setIsHide(true);
        setTimeout(() => {
          setIsDance(false);
          setIsHide(false);
        }, 3000);
      } else if (clickCountRef.current === 3) {
        setIsBounce(true);
        setIsHide(true);
        setTimeout(() => {
          setIsBounce(false);
          setIsHide(false);
        }, 3000);
      }
      clickCountRef.current = 0;
    }, 250);
  };

  return (
    <nav className="flex items-center justify-between px-4">
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

        <Link href={`/user/${currentUserId}`} onClick={toggleHBGmenu}>
          <li
            className={`text-white text-center font-bold py-2 px-4 rounded-full m-2 ${
              path === `/user/${currentUserId}`
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-gray-500 hover:bg-gray-700"
            }`}
          >
            Profile
          </li>
        </Link>

        <SignOutButton />
      </ul>

      <div className="flex-grow text-center">
        <Link href="/summary/diet">
          <img
            src="/my_body_buddy_logo_transparent.png"
            alt="logo"
            onClick={handleLogoClick}
            className={`h-20 w-20 mx-auto ${isHide ? "hidden" : ""}`}
          />
          <img
            src="/person_only_transparent.png"
            alt="person only logo"
            onClick={handleLogoClick}
            className={`h-20 w-20 mx-auto ${isHide ? "block" : "hidden"} ${
              isDance ? "animate-spin" : ""
            } ${isBounce ? "animate-bounce" : ""}`}
          />
        </Link>
      </div>
    </nav>
  );
}
