"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserData } from "@/components/user_profile/UserProfileWrapper";
import { goalCalCalc } from "@/app/_helper/goalCalCalc";

const UserProfileEditWrapper: React.FC = () => {
  const [formData, setFormData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/profile");
        const data = await response.json();
        setFormData({
          ...data,
          goalDate: data.goalDate ? new Date(data.goalDate) : null,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;

    const { name, value } = e.target;
    if (name === "goalDate") {
      const newDate = new Date(value);
      setFormData((prevData) => ({
        ...prevData!,
        goalDate: newDate,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData!,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    goalCalCalc(formData, setFormData); // Calculate the goal calories before saving
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          goalDate: formData.goalDate ? formData.goalDate.toISOString().split("T")[0] : null,
        }),
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

  if (!formData) {
    return <div>Loading...</div>;
  }

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const goalDateValue = formatDate(formData.goalDate);

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
                name="goalDate"
                value={goalDateValue}
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
            To reach your goal of {formData.goalWeight} kg until {goalDateValue}, you should take {formData.goalCal} Calories/day.
          </div>
        </div>

        <div className="flex justify-between w-1/3 m-10">
          <button type="submit" className="bg-dark-blue rounded-md px-3 py-2 text-beige">
            Save
          </button>
          <Link className="bg-dark-blue rounded-md px-3 py-2 text-beige" href={`/user`}>
            Done
          </Link>
        </div>
      </div>
    </form>
  );
};

export default UserProfileEditWrapper;
