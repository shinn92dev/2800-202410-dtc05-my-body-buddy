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
            {/* <div
                className={`fixed top-0 left-0 h-full w-1/3 bg-white border-r border-logo-pumpkin shadow-lg transform transition-transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } z-50 slide-out-menu`}
            >
                

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
            </div> */}
            <div className="w-1/3"></div>
            <div
                className={`text-center w-1/3${
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
            <div className="w-1/3 flex justify-end">
                <button
                    className="block ml-4 pr-2"
                    // onClick={toggleHBGmenu}
                    aria-label="Toggle menu"
                    onClick={toggleHBGmenu}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        width="30"
                        height="30"
                    >
                        <circle
                            cx="512"
                            cy="512"
                            r="472"
                            stroke="#FF6C1A"
                            stroke-width="80"
                            fill="none"
                        />
                        <circle cx="512" cy="384" r="128" fill="#FF6C1A" />
                        <path
                            d="M512,640c-106.1,0-208,53.3-208,106.7v85.3H720v-85.3C720,693.3,618.1,640,512,640Z"
                            fill="#FF6C1A"
                        />
                    </svg>
                </button>
            </div>
            <div
                className={`w-full fixed top-0 left-0  border-logo-pumpkin transform transition-transform h-16 bg-white shadow-sm ${
                    isOpen ? "translate-y-0" : "-translate-y-full"
                } z-50 slide-out-menu`}
            >
                <ul className="flex justify-center px-4 h-16">
                    <Link href="/profile" className="w-1/3">
                        <li className="flex justify-center px-4 mt-1.5">
                            <button
                                className="text-beige font-bold text-center py-1 px-3 rounded-full 
        m-2 bg-gray-500 hover:bg-gray-700 flex justify-center items-center"
                            >
                                Profile
                            </button>
                        </li>
                    </Link>
                    <li className="w-1/3 h-16 flex items-center">
                        <SignOutButton />
                    </li>
                    <li className="w-1/3 flex justify-end items-center pr-2 h-16">
                        <button onClick={toggleHBGmenu}>
                            <svg
                                className="mt-3 h-10 w-10 fill-current text-logo-pumpkin"
                                xmlns="http://www.w3.org/2000/svg"
                                height="20px"
                                viewBox="0 -960 960 960"
                                width="20px"
                                fill="#e8eaed"
                            >
                                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
