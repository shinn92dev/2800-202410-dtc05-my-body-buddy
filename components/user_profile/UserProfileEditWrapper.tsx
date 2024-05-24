"use client";

import Link from "next/link";
import { connectMongoDB } from "@/config/db";

export interface UserData {
  name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  goalWeight: number;
  goalDay: string;
  goalCal: number;
}

interface UserProfileWrapperProps {
  userData: UserData;
}

export default function UserProfileEditWrapper({
  userData,
}: UserProfileWrapperProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        id="basic-info"
        className="bg-orange m-5 tracking-wide leading-8 font-semibold text-center w-2/3"
      >
        <p className="text-4xl p-2">👤</p>
        <div>
          <div className="my-1">Name: {userData.name}</div>

          <div className="my-1">
            Age: <input type="text" placeholder={`${userData.age}`} />
          </div>

          <div className="my-1">
            Gender: <input type="text" placeholder={`${userData.gender}`} />
          </div>
          <div className="my-1">
            Height: <input type="text" placeholder={`${userData.height}`} /> cm
          </div>
          <div className="my-1">
            Weight: <input type="text" placeholder={`${userData.weight}`} /> kg
          </div>
          <br />
        </div>
      </div>
      <div
        id="goal-info"
        className="bg-orange m-5 tracking-wide leading-8 font-semibold text-center w-2/3"
      >
        <p className="text-4xl p-2">🎯</p>
        <div>
          <div className="my-1">
            Target Date:{" "}
            <input type="text" placeholder={`${userData.goalDay}`} />
          </div>
          <div className="my-1">
            Target Weight:{" "}
            <input type="text" placeholder={`${userData.goalWeight}`} />
            kg
          </div>
        </div>
        <br />
      </div>
      <div
        id="calorie-info"
        className="bg-orange m-5 tracking-wide leading-8 font-semibold text-center w-2/3"
      >
        <p className="text-4xl p-2">🚀</p>
        <div>
          To reach your goal of {userData.goalWeight} kg <br />
          until {userData.goalDay}, <br />
          you should eat: <br />
          {userData.goalCal} Calories/day
        </div>
        <br />
      </div>
      <div className="flex justify-center m-10">
        <Link
          href={`/user/${userData.name}`}
          className="bg-dark-blue rounded-md px-3 py-2 text-beige"
        >
          Done
        </Link>
      </div>
    </div>
  );
}
