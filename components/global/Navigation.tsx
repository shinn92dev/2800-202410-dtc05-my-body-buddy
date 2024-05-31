"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./signOutButton";
import { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";

export default function Navigation() {
    const path = usePathname();

    // for hamburger menu
    const [isOpen, setIsOpen] = useState(false);
    const toggleHBGmenu = () => setIsOpen(!isOpen);

    // for logo animation
    const [isHide, setIsHide] = useState(false);
    const [isDance, setIsDance] = useState(false);
    const [isBounce, setIsBounce] = useState(false);

    // for url path fetch
    const [loggedUsername, setLoggedUsername] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { isLoaded, isSignedIn, user } = useUser();

    const clickCountRef = useRef(0);
    const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (isLoaded && isSignedIn && user) {
            setLoggedUsername(user.username);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }, [isLoaded, isSignedIn, user]);

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
        <nav className="fixed top-0 w-full h-16 flex items-center justify-between px-4 z-50 bg-white shadow-sm">
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

            <div
                className={`fixed top-0 left-0 h-full w-1/3 bg-white border-r border-logo-pumpkin shadow-lg transform transition-transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } z-50 slide-out-menu`}
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

                <ul className="mt-16">
                    {!isLoading && loggedUsername ? (
                        <li>
                            <Link
                                href={`/profile`}
                                onClick={toggleHBGmenu}
                                className={`text-beige text-center font-bold py-2 px-4 rounded-full m-2 ${
                                    path === `/profile`
                                        ? "bg-dark-blue hover:bg-dark-blue"
                                        : "bg-gray-500 hover:bg-gray-700"
                                }`}
                            >
                                Profile
                            </Link>
                        </li>
                    ) : (
                        <li className="text-center py-2 px-4">Loading...</li>
                    )}
                    <li>
                        <SignOutButton />
                    </li>
                </ul>
            </div>

            <div
                className={`flex-grow text-center ${
                    isOpen ? "blur-sm" : ""
                } relative z-40`}
            >
                <Link href="/summary/diet">
                    <Image
                        src="/my_body_buddy_logo_transparent.png"
                        alt="logo"
                        onClick={handleLogoClick}
                        width="80"
                        height="80"
                        className={`mx-auto ${isHide ? "hidden" : ""}`}
                    />
                    <Image
                        src="/spin_person_only_transparent.png"
                        alt="person only logo"
                        onClick={handleLogoClick}
                        width={80}
                        height={80}
                        className={`mx-auto ${isHide ? "block" : "hidden"} ${
                            isDance ? "animate-spin" : ""
                        } ${isBounce ? "animate-bounce" : ""}`}
                    />
                </Link>
            </div>
        </nav>
    );
}
