"use client";

import React, { useEffect, useState } from "react";
import UserProfile from "@/components/user_profile/UserProfile";
import { fetchUserId } from "@/app/_helper/fetchUserId"; 

export interface UserData {
  name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  goalWeight: number;
  goalDate: Date;
  goalCal: number;
}

const UserProfileWrapper: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/profile");
        const data = await response.json();
        setUserData({
          ...data,
          goalDate: new Date(data.goalDate), // Ensure date is converted properly
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return <UserProfile userData={userData} />;
};

export default UserProfileWrapper;
