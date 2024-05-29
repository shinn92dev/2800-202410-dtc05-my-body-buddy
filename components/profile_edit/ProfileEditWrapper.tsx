"use client";

import React, { useState, useEffect } from "react";

const ProfileEditWrapper: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/profile");
        const data = await response.json();
        if (data) {
          setFormData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

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
      <div className="bg-orange m-5 tracking-wide leading-8 font-semibold text-center w-2/3">
        <p className="text-4xl p-2">👤</p>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="m-2 p-1 border"
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="m-2 p-1 border"
            />
          </label>
          <label>
            Gender:
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="m-2 p-1 border"
            />
          </label>
          <label>
            Height (cm):
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="m-2 p-1 border"
            />
          </label>
          <label>
            Weight (kg):
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="m-2 p-1 border"
            />
          </label>
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</button>
    </form>
  );
};

export default ProfileEditWrapper;
