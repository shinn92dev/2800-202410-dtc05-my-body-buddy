"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import LoadingAnimation from "../global/LoadingAnimation";
import toast, { Toaster } from "react-hot-toast";

const ProfileEditWrapper: React.FC = () => {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    preference: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/profile`);
        const data = res.data;
        setFormData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "activityLevel" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.post(`/api/profile`, formData);
      if (res.status !== 200) {
        throw new Error("Error updating profile data");
      }
      toast.success("Profile updated successfully");
      setTimeout(() => {
        window.location.href = "/profile";
      }, 2000);
    } catch (error) {
      setSubmitting(false);
      toast.error("Error updating profile data");
      console.error("Error updating profile data:", error);
    } 
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center my-6">
      <Toaster position="top-center" reverseOrder={false} />
      <form className="bg-orange p-6 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
        <div className="mb-4">
          <label className="block font-semibold pl-1 pb-1">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold pl-1 pb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold pl-1 pb-1">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold pl-1 pb-1">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold pl-1 pb-1">Daily Activity Level</label>
          <select
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          >
            <option value="">Select Activity Level</option>
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold pl-1 pb-1">Preference</label>
          <select
            name="preference"
            value={formData.preference}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          >
            <option value="">Select Preference</option>
            <option value="workout">Increase calories burn</option>
            <option value="diet">Decrease calories intake</option>
          </select>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className={`bg-dark-blue text-white px-4 py-2 rounded ${submitting ? "opacity-50 cursor-not-allowed" : "hover:bg-dark-blue-light"}`}
            disabled={submitting}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditWrapper;
