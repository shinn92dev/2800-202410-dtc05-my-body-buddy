"use client";

import React from "react";
import useTargetForm from "./UseTargetForm";
import SetTargetForm from "./SetTargetForm";

const SetTargetWrapper: React.FC = () => {
  const userId = "someUserId"; // Replace with actual user ID logic
  const { handleSubmit } = useTargetForm(userId);

  return <SetTargetForm onSubmit={handleSubmit} />;
};

export default SetTargetWrapper;
