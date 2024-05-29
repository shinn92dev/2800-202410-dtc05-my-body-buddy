"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserData } from "@/components/profile/ProfileWrapper";

const ProfileEditWrapper: React.FC = () => {
  const [formData, setFormData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/profile");
        const data = await response.json();
        setFormData({
          ...data,
          targetDate: data.targetDate ? new Date(data.targetDate) : null,
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
    if (name === "targetDate") {
      const newDate = new Date(value);
      setFormData((prevData) => ({
        ...prevData!,
        targetDate: newDate,
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

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          targetDate: formData.targetDate ? formData.targetDate.toISOString().split("T")[0] : null,
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

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return '';
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const targetDateValue = formatDate(formData.targetDate);

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
                name="targetDate"
                value={targetDateValue}
                onChange={handleChange}
              />
            </div>
            <div className="my-1">
              Target Weight: <br />
              <input
                type="number"
                name="targetWeight"
                value={formData.targetWeight}
                onChange={handleChange}
              />{" "}
              <br /> kg
            </div>
          </div>
        </div>

        <div className="bg-orange m-5 tracking-wide leading-8 font-semibold text-center w-2/3">
          <p className="text-4xl p-2">🚀</p>
          <div>
            To reach your goal of {formData.targetWeight} kg until {targetDateValue}, you should take {formData.targetCaloriesIntake} kcal/day and burn {formData.targetCaloriesBurn} kcal/day.
          </div>
        </div>

        <div className="flex justify-between w-1/3 m-10">
          <button type="submit" className="bg-dark-blue rounded-md px-3 py-2 text-beige">
            Save
          </button>
          <Link className="bg-dark-blue rounded-md px-3 py-2 text-beige" href={`/profile`}>
            Done
          </Link>
        </div>
      </div>
    </form>
  );
};

export default ProfileEditWrapper;
