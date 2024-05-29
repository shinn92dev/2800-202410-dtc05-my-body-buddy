// components/user_profile/UserProfileEditWrapper.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { UserData } from "@/components/user_profile/UserProfile";
import { goalCalCalc } from "@/app/_helper/goalCalCalc";

interface UserProfileEditWrapperProps {
  userData: UserData;
}

export default function UserProfileEditWrapper({ userData }: UserProfileEditWrapperProps) {
  const [formData, setFormData] = useState<UserData>({
    ...userData,
    goalDay: new Date(userData.goalDay) // Ensure date is converted properly
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "goalDay" ? new Date(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    goalCalCalc(formData, setFormData); // Calculate the goal calories before saving
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("Error updating user data");
      }
      const result = await res.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="bg-orange m-5 tracking-wide leading-8 font-semibold text-center w-2/3">
          <p className="text-4xl p-2">👤</p>
          <div>
            <div className="my-1">Name: {formData.name}</div>
            <div className="my-1">
              Age: <br />
              <input
                type="number"
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
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
              />{" "}
              <br /> cm
            </div>
            <div className="my-1">
              Weight: <br />
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />{" "}
              <br /> kg
            </div>
          </div>
        </div>

        <div className="bg-orange m-5 tracking-wide leading-8 font-semibold text-center w-2/3">
          <p className="text-4xl p-2">🎯</p>
          <div>
            <div className="my-1">
              Target Date: <br />
              <input
                type="date"
                name="goalDay"
                value={formData.goalDay.toISOString().split('T')[0]}
                onChange={handleChange}
              />
            </div>
            <div className="my-1">
              Target Weight: <br />
              <input
                type="number"
                name="goalWeight"
                value={formData.goalWeight}
                onChange={handleChange}
              />{" "}
              <br /> kg
            </div>
          </div>
        </div>

        <div className="bg-orange m-5 tracking-wide leading-8 font-semibold text-center w-2/3">
          <p className="text-4xl p-2">🚀</p>
          <div>
            To reach your goal of {formData.goalWeight} kg until {formData.goalDay.toLocaleDateString()}, you should take {formData.goalCal} Calories/day.
          </div>
        </div>

        <div className="flex justify-between w-1/3 m-10">
          <button type="submit" className="bg-dark-blue rounded-md px-3 py-2 text-beige">
            Save
          </button>
          <Link className="bg-dark-blue rounded-md px-3 py-2 text-beige" href={`/user/${userData.name}`}>
            Done
          </Link>
        </div>
      </div>
    </form>
  );
}
