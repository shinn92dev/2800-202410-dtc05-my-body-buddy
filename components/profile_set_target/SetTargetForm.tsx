import { useState, useEffect } from 'react';

interface SetTargetFormData {
  targetWeight: number | null;
  targetDate: Date | null;
  activityLevel: number;
  preference: string;
}

interface ProfileData {
  age: number;
  gender: string;
  height: number;
  weight: number;
}

interface SetTargetFormProps {
  onSubmit: (data: SetTargetFormData) => void;
}

const SetTargetForm: React.FC<SetTargetFormProps> = ({ onSubmit }) => {
  const [targetWeight, setTargetWeight] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [activityLevel, setActivityLevel] = useState(1);
  const [preference, setPreference] = useState('workout');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/api/profile');
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData) return;

    onSubmit({
      targetWeight: targetWeight ? Number(targetWeight) : null,
      targetDate: targetDate ? new Date(targetDate) : null,
      activityLevel: Number(activityLevel),
      preference,
    });
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="targetWeight" className="block text-sm font-medium text-gray-700">
          Target Weight (kg)
        </label>
        <input
          id="targetWeight"
          name="targetWeight"
          type="number"
          value={targetWeight}
          onChange={(e) => setTargetWeight(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700">
          Target Date
        </label>
        <input
          id="targetDate"
          name="targetDate"
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700">
          Activity Level
        </label>
        <select
          id="activityLevel"
          name="activityLevel"
          value={activityLevel}
          onChange={(e) => setActivityLevel(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        >
          <option value={1}>Low</option>
          <option value={2}>Medium</option>
          <option value={3}>High</option>
        </select>
      </div>
      <div>
        <label htmlFor="preference" className="block text-sm font-medium text-gray-700">
          Preference
        </label>
        <select
          id="preference"
          name="preference"
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="workout">More Workout</option>
          <option value="diet">Less Diet</option>
        </select>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Set Target
      </button>
    </form>
  );
};

export default SetTargetForm;
