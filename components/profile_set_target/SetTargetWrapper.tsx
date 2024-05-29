"use client";

import React, { useEffect, useState } from "react";
import SetTargetForm from "@/components/profile_set_target/SetTargetForm";

const SetTargetWrapper: React.FC = () => {
  const [targetData, setTargetData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/targets");
        const data = await response.json();
        setTargetData(data);
      } catch (error) {
        console.error("Error fetching target data:", error);
      }
    };

    fetchData();
  }, []);

  return <SetTargetForm target={targetData} />;
};

export default SetTargetWrapper;
