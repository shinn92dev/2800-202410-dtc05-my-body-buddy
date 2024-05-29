"use client";

import React, { useEffect, useState } from "react";
import Profile from "@/components/profile/Profile";

const ProfileWrapper: React.FC = () => {
  const [profileData, setProfileData] = useState(null);
  const [targetData, setTargetData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await fetch("/api/profile");
        const profile = await profileResponse.json();
        setProfileData(profile);

        const targetResponse = await fetch(`/api/targets/${profile.userId}`);
        const target = await targetResponse.json();
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
