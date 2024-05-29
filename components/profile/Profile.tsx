"use client";

import Link from "next/link";
import React from "react";
import { UserData } from "@/components/profile/ProfileWrapper";

interface ProfileProps {
  userData: UserData | null;
}

const Profile: React.FC<ProfileProps> = ({ userData }) => {
  if (!userData) {
    return <h2 className="text-center font-bold">User not found</h2>;
  } else {
    const targetDate = userData.targetDate ? new Date(userData.targetDate).toISOString().split("T")[0] : '';
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
            <div>Target Date: {targetDate}</div>
            <div>Target Weight: {userData.targetWeight} kg</div>
          </div>
        </div>
        <div className="bg-orange m-5 tracking-wide leading-8 font-semibold text-center w-2/3">
          <p className="text-4xl p-2">🚀</p>
          <div>
            To reach your goal of {userData.targetWeight} kg until {targetDate}, you should take {userData.targetCaloriesIntake} kcal/day and burn {userData.targetCaloriesBurn} kcal/day.
          </div>
        </div>
        <div className="flex justify-center m-10">
          <Link href={`/profile/edit`} className="bg-dark-blue rounded-md px-3 py-2 text-beige">
            Edit
          </Link>
        </div>
      </div>
    );
  }
};

export default Profile;
