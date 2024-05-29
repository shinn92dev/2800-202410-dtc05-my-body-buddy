"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import SetTargetForm from "@/components/profile_set_target/SetTargetForm";

const SetTargetWrapper: React.FC = () => {
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const profileResponse = await axios.get("/api/profile");
        if (profileResponse.status === 404) {
          redirect("/profile/edit");
        } else {
          setProfileExists(true);
        }
      } catch (error) {
        console.error("Error checking profile existence:", error);
      }
    };

    checkProfile();
  }, []);

  return profileExists ? <SetTargetForm /> : null;
};

export default SetTargetWrapper;
