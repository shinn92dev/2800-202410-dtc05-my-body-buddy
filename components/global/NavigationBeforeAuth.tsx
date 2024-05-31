"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function NavigationBeforeAuth() {
    const path = usePathname();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleHBGmenu = () => setIsOpen(!isOpen);
    const handleLinkClick = () => setIsOpen(false);
    useEffect(() => {
        setIsOpen(false);
    }, [path]);
    return (
        <nav className="fixed top-0 w-full h-16 flex items-center justify-between px-4 z-50 bg-white shadow-sm">
            <div className="w-1/3"></div>
            <div
                className={`text-center w-1/3${
                    isOpen ? "blur-sm" : ""
                } relative z-40`}
            >
                <Link href="/" onClick={handleLinkClick}>
                    <Image
                        src="/my_body_buddy_logo_transparent.png"
                        alt="logo"
                        width="80"
                        height="80"
                        className={`mx-auto`}
                    />
                </Link>
            </div>
            <div className="w-1/3 flex justify-end">
                <button
                    className="block ml-4 pr-2"
                    aria-label="Toggle menu"
                    onClick={toggleHBGmenu}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="35px"
                        viewBox="0 -960 960 960"
                        width="35px"
                        fill="#e8eaed"
                        strokeWidth="150"
                        className="text-logo-pumpkin"
                    >
                        <path d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
                    </svg>
                </button>
            </div>
            <div
                className={`w-full fixed top-0 left-0  border-logo-pumpkin transform transition-transform h-16 bg-white shadow-sm ${
                    isOpen ? "translate-y-0" : "-translate-y-full"
                } z-50 slide-out-menu`}
            >
                <ul className="flex justify-center px-4 h-16">
                    <li className="w-1/10 flex justify-start items-center pl-2">
                        <Image
                            src="/my_body_buddy_logo_transparent.png"
                            alt="logo"
                            width="35"
                            height="35"
                            className={`mx-auto`}
                        />
                    </li>
                    <li className="flex justify-center items-center w-2/5">
                        <Link href="/login" onClick={handleLinkClick}>
                            <button
                                className="w-100 text-beige font-bold text-center py-1 px-3 rounded-full 
  m-2 bg-gray-500 hover:bg-gray-700 flex justify-center items-center"
                            >
                                Sign In
                            </button>
                        </Link>
                    </li>

                    <li className="w-2/5 h-16 flex items-center">
                        <Link href="/signup" onClick={handleLinkClick}>
                            <button
                                className="w-100 text-beige font-bold text-center py-1 px-3 rounded-full 
  m-2 bg-gray-500 hover:bg-gray-700 flex justify-center items-center"
                            >
                                Sign Up
                            </button>
                        </Link>
                    </li>
                    <li className="w-1/10 flex justify-end items-center pr-2 h-16">
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
