import { useState, useEffect } from "react";

interface SetTargetFormData {
  targetWeight: number | null;
  targetDate: Date | null;
  activityLevel: number;
  preference: string;
}

const useTargetForm = (userId: string) => {
  const [formData, setFormData] = useState<SetTargetFormData>({
    targetWeight: null,
    targetDate: null,
    activityLevel: 1,
    preference: 'workout',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/targets/${userId}`);
        const data = await response.json();
        if (data) {
          setFormData({
            targetWeight: data.targetWeight || null,
            targetDate: data.targetDate ? new Date(data.targetDate) : null,
            activityLevel: data.activityLevel || 1,
            preference: data.preference || 'workout',
          });
        }
      } catch (error) {
        console.error("Error fetching target data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleSubmit = async (data: SetTargetFormData) => {
    try {
      const response = await fetch("/api/targets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          ...data,
          targetDate: data.targetDate ? new Date(data.targetDate).toISOString().split("T")[0] : null,
        }),
      });

      if (!response.ok) {
        throw new Error("Error updating target data");
      }

      // Handle successful submission, e.g., show a message, update state, etc.
    } catch (error) {
      console.error("Error updating target data:", error);
    }
  };

  return {
    handleSubmit,
  };
};

export default useTargetForm;
