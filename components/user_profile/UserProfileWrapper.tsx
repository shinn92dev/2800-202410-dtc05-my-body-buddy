"use client";
// TODO: one time pop-up message for complete profile

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

export default function UserProfileWrapper({
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
          <div>Name: {userData.name}</div>
          <div>Age: {userData.age}</div>
          <div>Gender: {userData.gender}</div>
          <div>Height: {userData.height} cm</div>
          <div>Weight: {userData.weight} kg</div>
          <br />
        </div>
      </div>
      <div
        id="goal-info"
        className="bg-orange m-5 tracking-wide leading-8 font-semibold text-center w-2/3"
      >
        <p className="text-4xl p-2">🎯</p>
        <div>
          <div>Target Date: {userData.goalDay}</div>
          <div>Target Weight: {userData.goalWeight} kg</div>
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
          href={`/user/${userData.name}/edit`}
          className="bg-dark-blue rounded-md px-3 py-2 text-beige"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
