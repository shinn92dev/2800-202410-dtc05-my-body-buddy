"use client";

import Link from "next/link";
import { connectMongoDB } from "@/config/db";
import { useState } from "react";

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
  const [formData, setFormData] = useState<UserData>(userData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("Error updating user data");
      }
      console.log(formData);
      const result = await res.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center"
    >
      <div
        id="basic-info"
        className="bg-orange m-5 tracking-wide leading-8 font-semibold text-center w-2/3"
      >
        <p className="text-4xl p-2">👤</p>
        <div>
          <div className="my-1">Name: {userData.name}</div>
          <div className="my-1">
            Age: <br />
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="my-1">
            Gender: <br />
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
          </div>
          <div className="my-1">
            Height: <br />
            <input
              type="text"
              name="height"
              value={formData.height}
              onChange={handleChange}
            />{" "}
            <br /> cm
          </div>
          <div className="my-1">
            Weight: <br />
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />{" "}
            <br /> kg
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
            Target Date: <br />
            <input
              type="text"
              name="goalDay"
              value={formData.goalDay}
              onChange={handleChange}
            />
          </div>
          <div className="my-1">
            Target Weight: <br />
            <input
              type="text"
              name="goalWeight"
              value={formData.goalWeight}
              onChange={handleChange}
            />{" "}
            <br /> kg
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
      <div className="flex justify-between w-1/3 m-10">
        <button
          type="submit"
          className="bg-dark-blue rounded-md px-3 py-2 text-beige"
        >
          Save
        </button>
        <Link
          className="bg-dark-blue rounded-md px-3 py-2 text-beige"
          href={`/user/${userData.name}`}
        >
          Done
        </Link>
      </div>
    </form>
  );
}
