"use client";

import Link from "next/link";
import React from "react";
import { UserData } from "@/components/user_profile/UserProfileWrapper";

interface UserProfileProps {
  userData: UserData | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
  if (!userData) {
    return <h2 className="text-center font-bold">User not found</h2>;
  } else {
    return (
      <div className="flex flex-col items-center">
        <div className="bg-orange m-5 tracking-wide leading-8 font-semibold text-center w-2/3">
          <p className="text-4xl p-2">👤</p>
          <div>
            <div>Name: {userData.name}</div>
            <div>Age: {userData.age}</div>
            <div>Gender: {userData.gender}</div>
            <div>Height: {userData.height} cm</div>
            <div>Weight: {userData.weight} kg</div>
          </div>
        </div>
        <div className="bg-orange m-5 tracking-wide leading-8 font-semibold text-center w-2/3">
          <p className="text-4xl p-2">🎯</p>
          <div>
            <div>Target Date: {new Date(userData.goalDate).toISOString().split("T")[0]}</div>
            <div>Target Weight: {userData.goalWeight} kg</div>
          </div>
        </div>
        <div className="bg-orange m-5 tracking-wide leading-8 font-semibold text-center w-2/3">
          <p className="text-4xl p-2">🚀</p>
          <div>
            To reach your goal of {userData.goalWeight} kg until {new Date(userData.goalDate).toISOString().split("T")[0]}, you should take {userData.goalCal} Calories/day.
          </div>
        </div>
        <div className="flex justify-center m-10">
          <Link href={`/user/edit`} className="bg-dark-blue rounded-md px-3 py-2 text-beige">
            Edit
          </Link>
        </div>
      </div>
    );
  }
};

export default UserProfile;
