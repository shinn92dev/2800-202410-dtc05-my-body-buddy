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
    );
  }

  const preferenceToBeDisplayed =
    profile.preference === "workout" ? "Increase calories burn" : "Reduce calories intake";

  const activityLevelToBeDisplayed =
    profile.activityLevel === 1 ? "Low" : profile.activityLevel === 2 ? "Medium" : "High";

  const genderToBeDisplayed = profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1);

  const bmi = (profile.weight / ((profile.height / 100) * (profile.height / 100))).toFixed(1);

  const healthyWeight = (22 * (profile.height / 100) * (profile.height / 100)).toFixed(1);

  const bmr = Math.round(calculateBmr(profile.age, profile.height, profile.weight, profile.gender));

  const targetDateToBeDisplayed = target?.targetDate?.split("T")[0] ?? "";

  return (
    <div className="flex flex-col items-center space-y-6 min-h-screen">
      <div className="bg-orange-500 m-5 p-4 rounded-md shadow-lg text-center w-4/5 md:w-3/5 bg-orange">
        <p className="text-4xl p-2">👤</p>
        <div className="grid grid-cols gap-4">
          <div><span className="font-bold">Name:</span> {user.username}</div>
          <div><span className="font-bold">Email:</span> {user.email}</div>
          <div><span className="font-bold">Age:</span> {profile.age}</div>
          <div><span className="font-bold">Gender:</span> {genderToBeDisplayed}</div>
          <div><span className="font-bold">Height:</span> {profile.height} cm</div>
          <div><span className="font-bold">Weight:</span> {profile.weight} kg</div>
          <div><span className="font-bold">Healthy Weight:</span> {healthyWeight} kg</div>
          <div><span className="font-bold">BMI:</span> {bmi}</div>
          <div><span className="font-bold">Daily Activity Level:</span> {activityLevelToBeDisplayed}</div>
          <div><span className="font-bold">Preference:</span> {preferenceToBeDisplayed}</div>
          <div><span className="font-bold">BMR:</span> {bmr} kcal/day</div>
        </div>
      </div>
      {target && (
        <div className="bg-orange-500 m-5 p-4 rounded-md shadow-lg text-center w-4/5 md:w-3/5 bg-orange">
          <p className="text-4xl p-2">🎯</p>
          <div className="grid grid-cols gap-4">
            <div><span className="font-bold">Target Date:</span> {targetDateToBeDisplayed}</div>
            <div><span className="font-bold">Target Weight:</span> {target.targetWeight} kg</div>
            <div><span className="font-bold">Target Calories Intake:</span> {target.targetCaloriesIntake} kcal/day</div>
            <div><span className="font-bold">Target Calories Burn:</span> {target.targetCaloriesBurn} kcal/day</div>
          </div>
        </div>
      )}
      <div className="flex space-x-4">
        <Link href="/profile/edit">
          <button className="bg-dark-blue text-white p-2 rounded hover:bg-dark-blue-light">Edit Profile</button>
        </Link>
        <Link href="/profile/set-target">
          <button className="bg-logo-pumpkin text-white p-2 rounded hover:bg-logo-pumpkin-light">Set Target</button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
