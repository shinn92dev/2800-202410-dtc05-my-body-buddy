"use client";

import React, { useEffect, useState } from "react";
import Profile from "@/components/profile/Profile";
import axios from "axios";

const ProfileWrapper: React.FC = () => {
  const [profileData, setProfileData] = useState(null);
  const [targetData, setTargetData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await axios("/api/profile");
        const profile = profileResponse.data;
        setProfileData(profile);

        const targetResponse = await axios(`/api/targets/${profile.userId}`);
        const target = targetResponse.data;
        setTargetData(target);
      } catch (error) {
        console.error("Error fetching profile or target data:", error);
      }
    };

    fetchData();
  }, []);

  return <Profile profile={profileData} target={targetData} />;
};

export default ProfileWrapper;
