"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAuth } from "@clerk/nextjs";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

export const handleDateSelect = (selectedDate: Date, setDate: (date: string) => void) => {
  const utcDate = new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()));
  setDate(utcDate.toISOString().split("T")[0]);
};

const SetTargetForm: React.FC = () => {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    targetWeight: "",
    targetDate: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isSaved, setIsSaved] = useState(false);

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
        toast.error("Error fetching profile and target data");
        console.error("Error fetching profile and target data:", error);
      } finally {
        setLoading(false);
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

  const handleDateChange: CalendarProps["onChange"] = (value, event) => {
    if (value instanceof Date) {
      setSelectedDate(value);
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
    setSubmitting(true);
    try {
      const { data } = await axios.post("/api/targets", formData);
      toast.success(data.message);
      setIsSaved(true);
      setTimeout(() => {
        window.location.href = "/profile";
      }, 2000);
    } catch (error) {
      toast.error("Error updating target data");
      console.error("Error updating target data:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Set Target</h2>
        <div className="mb-4 text-center">
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
        <div className="mb-4 text-center">
          <label className="block text-gray-700">Target Date</label>
          <div className="flex justify-center">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              minDate={today}
              className="inline-block"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-dark-blue text-white px-4 py-2 rounded hover:bg-dark-blue-light disabled:opacity-50"
            disabled={submitting || isSaved}
          >
            {submitting ? "Saving..." : "Save Target"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetTargetForm;
