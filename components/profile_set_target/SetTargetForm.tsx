"use client";

import React, { useState, useEffect } from "react";
import { handleDateSelect } from "@/app/_helper/handleDate";
import { useAuth } from "@clerk/nextjs";

const SetTargetForm: React.FC = () => {
  const { userId } = useAuth();
  const [formData, setFormData] = useState({
    targetWeight: "",
    targetDate: "",
    activityLevel: "",
    preference: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/profile/${userId}`);
        const data = await res.json();
        setFormData({
          ...formData,
          ...data,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [formData, userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "activityLevel" ? parseInt(value) : value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    handleDateSelect(selectedDate, (dateString) => {
      setFormData((prevData) => ({
        ...prevData,
        targetDate: dateString,
      }));
    });
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
      alert(result.message);
      window.location.href = "/profile";
    } catch (error) {
      console.error("Error updating target data:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Set Target</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Target Weight (kg)</label>
          <input
            type="number"
            name="targetWeight"
            value={formData.targetWeight}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Target Date</label>
          <input
            type="date"
            name="targetDate"
            value={formData.targetDate}
            onChange={handleDateChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Activity Level</label>
          <select
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          >
            <option value="">Select Activity Level</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Preference</label>
          <select
            name="preference"
            value={formData.preference}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          >
            <option value="">Select Preference</option>
            <option value="workout">More Workout</option>
            <option value="diet">Less Diet</option>
          </select>
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Save Target
        </button>
      </form>
    </div>
  );
};

export default SetTargetForm;
