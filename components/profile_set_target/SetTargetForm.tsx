"use client";

import React, { useState, useEffect } from "react";
import { handleDateSelect } from "@/app/_helper/handleDate";

interface SetTargetFormProps {
  target: {
    targetWeight: number;
    targetDate: string;
    activityLevel: string;
    preference: string;
  } | null;
}

const SetTargetForm: React.FC<SetTargetFormProps> = ({ target }) => {
  const [formData, setFormData] = useState({
    targetWeight: target?.targetWeight || "",
    targetDate: target?.targetDate || "",
    activityLevel: target?.activityLevel || "Low",
    preference: target?.preference || "More Workout",
  });

  useEffect(() => {
    if (target) {
      setFormData({
        targetWeight: target.targetWeight,
        targetDate: target.targetDate,
        activityLevel: target.activityLevel,
        preference: target.preference,
      });
    }
  }, [target]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDateSelect(new Date(e.target.value), (date) => setFormData((prevData) => ({
      ...prevData,
      targetDate: date,
    })));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/targets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("Error updating target data");
      }
      const result = await res.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error updating target data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
      <div className="bg-orange m-5 tracking-wide leading-8 font-semibold text-center w-2/3">
        <p className="text-4xl p-2">🎯</p>
        <div>
          <label>
            Target Weight (kg):
            <input
              type="number"
              name="targetWeight"
              value={formData.targetWeight}
              onChange={handleChange}
              className="m-2 p-1 border"
            />
          </label>
          <label>
            Target Date:
            <input
              type="date"
              name="targetDate"
              value={formData.targetDate}
              onChange={handleDateChange}
              className="m-2 p-1 border"
            />
          </label>
          <label>
            Activity Level:
            <select
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
              className="m-2 p-1 border"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
          <label>
            Preference:
            <select
              name="preference"
              value={formData.preference}
              onChange={handleChange}
              className="m-2 p-1 border"
            >
              <option value="More Workout">More Workout</option>
              <option value="Less Diet">Less Diet</option>
            </select>
          </label>
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</button>
    </form>
  );
};

export default SetTargetForm;
