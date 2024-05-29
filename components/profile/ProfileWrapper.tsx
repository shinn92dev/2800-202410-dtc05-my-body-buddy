"use client";

import React, { useEffect, useState } from "react";
import Profile from "@/components/profile/Profile";
import axios from "axios";

const ProfileWrapper: React.FC = () => {
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [targetData, setTargetData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("/api/user");
        const user = userResponse.data;
        setUserData(user);

        const profileResponse = await axios.get("/api/profile");
        const profile = profileResponse.data;
        setProfileData(profile);

        const targetResponse = await axios.get(`/api/targets`);
        const target = targetResponse.data;
        setTargetData(target);
      } catch (error) {
        console.error("Error fetching profile or target data:", error);
      }
    };
    fetchData();
  }, []);

  return <Profile user={userData} profile={profileData} target={targetData} />;
};

export default ProfileWrapper;
