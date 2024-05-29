"use client";

import React from "react";

interface ProfileProps {
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

const Profile: React.FC<ProfileProps> = ({ profile, target }) => {
  if (!profile) {
    return <div>User profile not found</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="bg-orange m-5 tracking-wide leading-8 font-semibold text-center w-2/3">
        <p className="text-4xl p-2">👤</p>
        <div>
          <div>Name: {profile.name}</div>
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
    </div>
  );
};

export default Profile;
