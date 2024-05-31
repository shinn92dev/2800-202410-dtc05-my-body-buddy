"use client";

import React from "react";
import Link from "next/link";
import { calculateBmr, factorByActivityLevel, calculateEnergyRequirementsPerDay } from "@/app/_helper/calorie";
import LoadingAnimation from "../global/LoadingAnimation";

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
        <LoadingAnimation />
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

  const activityFactor = factorByActivityLevel(profile.age, profile.activityLevel);

  const energyRequirements = calculateEnergyRequirementsPerDay(bmr, activityFactor);

  let targetDailyWorkOutCalories;

  if (target) {
    if (target.targetCaloriesBurn < energyRequirements) {
      targetDailyWorkOutCalories = 0;
    } else {
      targetDailyWorkOutCalories = Math.round(target.targetCaloriesBurn - energyRequirements);
        }
  }

  const targetDateToBeDisplayed = target?.targetDate?.split("T")[0] ?? "";

  return (
    <div className="flex flex-col items-center space-y-6 min-h-screen">
      <div className="bg-orange-500 m-5 p-4 rounded-md shadow-lg text-center w-4/5 md:w-3/5 bg-orange">
        <p className="text-4xl p-2">👤</p>
        <div className="grid grid-cols gap-4">
          <div><span className="font-bold">Name:</span> <span className="font-semibold text">{user.username}</span></div>
          <div><span className="font-bold">Email:</span> <span className="font-semibold">{user.email}</span></div>
          <div><span className="font-bold">Age:</span> <span className="font-semibold">{profile.age}</span></div>
          <div><span className="font-bold">Gender:</span> <span className="font-semibold">{genderToBeDisplayed}</span></div>
          <div><span className="font-bold">Height:</span> <span className="font-semibold">{profile.height} cm</span></div>
          <div><span className="font-bold">Weight:</span> <span className="font-semibold">{profile.weight} kg</span></div>
          <div><span className="font-bold">Healthy Weight:</span> <span className="font-semibold">{healthyWeight} kg</span></div>
          <div><span className="font-bold">BMI:</span> <span className="font-semibold">{bmi}</span></div>
          <div><span className="font-bold">Daily Activity Level:</span> <span className="font-semibold">{activityLevelToBeDisplayed}</span></div>
          <div><span className="font-bold">Preference:</span> <span className="font-semibold">{preferenceToBeDisplayed}</span></div>
          <div><span className="font-bold">BMR:</span> <span className="font-semibold">{bmr} kcal/day</span></div>
        </div>
      </div>
      {target && (
        <div className="bg-orange-500 m-5 p-4 rounded-md shadow-lg text-center w-4/5 md:w-3/5 bg-orange">
          <p className="text-4xl p-2">🎯</p>
          <div className="grid grid-cols gap-4">
            <div><span className="font-bold">Target Date:</span> <span className="font-semibold">{targetDateToBeDisplayed}</span></div>
            <div><span className="font-bold">Target Weight:</span> <span className="font-semibold">{target.targetWeight} kg</span></div>
            <div><span className="font-bold">Target Calories Intake:</span> <span className="font-semibold">{target.targetCaloriesIntake} kcal/day</span></div>
            <div><span className="font-bold">Target Calories Burn:</span> <span className="font-semibold">{target.targetCaloriesBurn} kcal/day</span></div>
             <div><span className="font-bold">Target Daily WorkOut Calories Burn:</span> <span className="font-semibold">{targetDailyWorkOutCalories} kcal/day</span></div>
          </div>
        </div>
      )}
      <div className="flex space-x-4 pb-6">
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
