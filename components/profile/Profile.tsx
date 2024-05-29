"use client";

import React from "react";
import Link from "next/link";

interface ProfileProps {
  user : {
    username: string;
    email: string;
  } | null;
  profile: {
    name: string;
    age: number;
    gender: string;
    height: number;
    weight: number;
  } | null;
  target: {
    targetCaloriesIntake: number;
    targetCaloriesBurn: number;
    targetWeight: number;
    targetDate: string;
  } | null;
}

const Profile: React.FC<ProfileProps> = ({ user, profile, target }) => {
  if (!profile || !user) {
    return <div>User profile not found</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="bg-orange m-5 tracking-wide leading-8 font-semibold text-center w-2/3">
        <p className="text-4xl p-2">👤</p>
        <div>
          <div>Name: {user.username}</div>
          <div>Email: {user.email}</div>
          <div>Age: {profile.age}</div>
          <div>Gender: {profile.gender}</div>
          <div>Height: {profile.height} cm</div>
          <div>Weight: {profile.weight} kg</div>
        </div>
      </div>
      {target && (
        <div className="bg-orange m-5 tracking-wide leading-8 font-semibold text-center w-2/3">
          <p className="text-4xl p-2">🎯</p>
          <div>
            <div>Target Date: {target.targetDate}</div>
            <div>Target Weight: {target.targetWeight} kg</div>
            <div>Calories Intake: {target.targetCaloriesIntake} kcal/day</div>
            <div>Calories Burn: {target.targetCaloriesBurn} kcal/day</div>
          </div>
        </div>
      )}
      <div className="flex space-x-4">
        <Link href="/profile/edit">
          <button className="bg-blue-500 text-white p-2 rounded">Edit Profile</button>
        </Link>
        <Link href="/profile/set-target">
          <button className="bg-green-500 text-white p-2 rounded">Set Target</button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
