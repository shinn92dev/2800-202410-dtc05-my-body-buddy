"use client";

import React, { useState, useEffect } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

const handleDateSelect = (selectedDate: Date, setDate: (date: string) => void) => {
  const year = selectedDate.getFullYear();
  const month = (`0${selectedDate.getMonth() + 1}`).slice(-2);
  const day = (`0${selectedDate.getDate()}`).slice(-2);
  const dateString = `${year}-${month}-${day}`;
  setDate(dateString);
};

const SetTargetForm: React.FC = () => {
  const { userId } = useAuth();
  const [formData, setFormData] = useState({
    targetWeight: "",
    targetDate: "",
  });

  useEffect(() => {
    const fetchProfileAndTarget = async () => {
      try {
        const res = await axios.get(`/api/targets`);
        const data = res.data;
        setFormData({
          targetWeight: data.target?.targetWeight || "",
          targetDate: data.target?.targetDate || "",
        });
      } catch (error) {
        console.error("Error fetching profile and target data:", error);
      }
    };

    fetchProfileAndTarget();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      handleDateSelect(value, (dateString) => {
        setFormData((prevData) => ({
          ...prevData,
          targetDate: dateString,
        }));
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/targets", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status !== 201) {
        throw new Error("Error updating target data");
      }
      alert(res.data.message);
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
          <Calendar
            onChange={handleDateChange}
            value={formData.targetDate ? new Date(formData.targetDate) : new Date()}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Save Target
        </button>
      </form>
    </div>
  );
};

export default SetTargetForm;
