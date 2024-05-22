"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationFooter() {
  const path = usePathname();
  console.log(path);

  const getButtonClasses = (buttonPath: string) => {
    return path === buttonPath ? "text-white font-bold" : "text-gray-400";
  };

  return (
    <div className="relative">
      <div
        className="grid grid-flow-col justify-stretch absolute inset-x-0 bottom-0 h-20
        bg-logo-pumpkin text-beige text-center"
      >
        <Link
          className={`grid justify-items-center ${getButtonClasses(
            "/summary/diet"
          )}`}
          href="/summary/diet"
        >
          <div className="content-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="m175-120-56-56 410-410q-18-42-5-95t57-95q53-53 118-62t106 32q41 41 32 106t-62 118q-42 44-95 57t-95-5l-50 50 304 304-56 56-304-302-304 302Zm118-342L173-582q-54-54-54-129t54-129l248 250-128 128Z" />
            </svg>
            Diet
          </div>
        </Link>
        <Link
          href="/"
          className={`grid justify-items-center ${getButtonClasses("/")}`}
        >
          <div className="content-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
            </svg>
            Home
          </div>
        </Link>
        <Link
          href="/summary/workout"
          className={`grid justify-items-center ${getButtonClasses(
            "/summary/workout"
          )}`}
        >
          <div className="content-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="m480-80-20-400-140-40H40v-80h240l280-200 52 61-166 119h114l312-180 48 56-340 264-20 400h-80ZM240-640q-33 0-56.5-23.5T160-720q0-33 23.5-56.5T240-800q33 0 56.5 23.5T320-720q0 33-23.5 56.5T240-640Z" />
            </svg>
            Work Out
          </div>
        </Link>
      </div>
    </div>
  );
}
