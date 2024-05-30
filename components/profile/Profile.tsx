"use client";

import React from "react";
import Link from "next/link";
import { calculateBmr } from "@/app/_helper/calorie";
import { ClipLoader } from "react-spinners";

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
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
    )
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

  const genderToBeDisplayed = profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1);

  const bmi = (profile.weight / ((profile.height / 100) * (profile.height / 100))).toFixed(1);

  const healthyWeight = (22 * (profile.height / 100) * (profile.height / 100)).toFixed(1);

  const bmr = Math.round(calculateBmr(profile.age, profile.height, profile.weight, profile.gender));

  const targetDateToBeDisplayed = target?.targetDate ? target.targetDate.split("T")[0] : "";

  return (
    <div className="flex flex-col items-center">
      <div className="bg-orange m-5 tracking-wide leading-8 font-semibold text-center w-2/3">
        <p className="text-4xl p-2">👤</p>
        <div>
          <div><span className="font-bold">Name</span>: {user.username}</div>
          <div><span className="font-bold">Email</span>: {user.email}</div>
          <div><span className="font-bold">Age</span>: {profile.age}</div>
          <div><span className="font-bold">Gender</span>: {genderToBeDisplayed}</div>
          <div><span className="font-bold">Height</span>: {profile.height} cm</div>
          <div><span className="font-bold">Weight</span>: {profile.weight} kg</div>
          <div><span className="font-bold">Healthy Weight</span>: {healthyWeight}</div>
          <div><span className="font-bold">BMI</span>: {bmi}</div>
          <div><span className="font-bold">Activity Level</span>: {activityLevelToBeDisplayed}</div>
          <div><span className="font-bold">Preference</span>: {preferenceToBeDisplayed}</div>
        </div>
      </div>
      {target && (
        <div className="bg-orange m-5 tracking-wide leading-8 font-semibold text-center w-2/3">
          <p className="text-4xl p-2">🎯</p>
          <div>
            <div><span className="font-bold">Target Date</span>: {targetDateToBeDisplayed}</div>
            <div><span className="font-bold">Target Weight</span>: {target.targetWeight} kg</div>
            <div><span className="font-bold">BMR</span>: {bmr} kcal/day</div>
            <div><span className="font-bold">Target Calories Intake</span>: {target.targetCaloriesIntake} kcal/day</div>
            <div><span className="font-bold">Target Calories Burn</span>: {target.targetCaloriesBurn} kcal/day</div>
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
