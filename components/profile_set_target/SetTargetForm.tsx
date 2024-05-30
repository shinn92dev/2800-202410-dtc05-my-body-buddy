"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { handleDateSelect } from "@/app/_helper/handleDate";
import { useAuth } from "@clerk/nextjs";

const SetTargetForm: React.FC = () => {
  const { userId } = useAuth();
  const [formData, setFormData] = useState({
    targetWeight: "",
    targetDate: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchProfileAndTarget = async () => {
      try {
        const { data } = await axios.get(`/api/targets`);
        setFormData({
          targetWeight: data.target?.targetWeight || "",
          targetDate: data.target?.targetDate || "",
        });
        if (data.target?.targetDate) {
          setSelectedDate(new Date(data.target.targetDate));
        }
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

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    handleDateSelect(date, (dateString) => {
      setFormData((prevData) => ({
        ...prevData,
        targetDate: dateString,
      }));
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/targets", formData);
      alert(data.message);
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
            value={selectedDate}
            className="w-full"
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
