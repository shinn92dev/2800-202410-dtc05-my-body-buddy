"use client";

import React from "react";
import Link from "next/link";

interface ProfileProps {
  user: {
    username: string;
    email: string;
  } | null;
  profile: {
    name: string;
    age: number;
    gender: string;
    height: number;
    weight: number;
    activityLevel: number;
    preference: string;
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

  let preferenceToBeDisplayed;

  if (profile.preference === "workout") {
    preferenceToBeDisplayed = "Increase calories burn";
  } else {
    preferenceToBeDisplayed = "Reduce calories intake";
  }

  let activityLevelToBeDisplayed;

  if (profile.activityLevel === 1) {
    activityLevelToBeDisplayed = "Low";
  } else if (profile.activityLevel === 2) {
    activityLevelToBeDisplayed = "Medium";
  } else {
    activityLevelToBeDisplayed = "High";
  }

  return (
    <div className="flex flex-col items-center">
      <div className="bg-orange m-5 tracking-wide leading-8 font-semibold text-center w-2/3">
        <p className="text-4xl p-2">👤</p>
        <div>
          <div><span className="font-bold">Name</span>: {user.username}</div>
          <div><span className="font-bold">Email</span>: {user.email}</div>
          <div><span className="font-bold">Age</span>: {profile.age}</div>
          <div><span className="font-bold">Gender</span>: {profile.gender}</div>
          <div><span className="font-bold">Height</span>: {profile.height} cm</div>
          <div><span className="font-bold">Weight</span>: {profile.weight} kg</div>
          <div><span className="font-bold">Activity Level</span>: {activityLevelToBeDisplayed}</div>
          <div><span className="font-bold">Preference</span>: {preferenceToBeDisplayed}</div>
        </div>
      </div>
      {target && (
        <div className="bg-orange m-5 tracking-wide leading-8 font-semibold text-center w-2/3">
          <p className="text-4xl p-2">🎯</p>
          <div>
            <div><span className="font-bold">Target Date</span>: {target.targetDate}</div>
            <div><span className="font-bold">Target Weight</span>: {target.targetWeight} kg</div>
            <div><span className="font-bold">Calories Intake</span>: {target.targetCaloriesIntake} kcal/day</div>
            <div><span className="font-bold">Calories Burn</span>: {target.targetCaloriesBurn} kcal/day</div>
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
