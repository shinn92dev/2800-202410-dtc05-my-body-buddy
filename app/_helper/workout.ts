import { connectMongoDB } from "@/config/db";
import WorkoutModel from "@/models/Workout";
import { format } from "date-fns";
import axios from "axios";
import { WorkoutData, WorkoutDetail } from "@/config/types";

// Parameter: workout date from MongoDB
const formatDateFromMongoDB = (date: Date): string => {
    return new Date(date).toISOString().split("T")[0];
};
// Parameter: workout date from User
export const formatDateFromInput = (date: Date): string => {
    return format(date, "yyyy-MM-dd");
};

export const fetchWorkoutForSpecificDate = (
    workoutData: WorkoutData,
    date: string
): { achieved: WorkoutDetail[]; onGoing: WorkoutDetail[] } => {
    const dailyWorkout = workoutData.workouts.find(
        (d: { date: { toISOString: () => string } }) => {
            const workoutDate = d.date.toISOString().split("T")[0];
            return workoutDate === date;
        }
    );
    if (!dailyWorkout) {
        return { achieved: [], onGoing: [] };
    }
    const achievedWorkout = dailyWorkout.workoutDetail.filter(
        (workout: WorkoutDetail) => {
            return workout.achieved;
        }
    );
    const onGoingWorkout = dailyWorkout.workoutDetail.filter(
        (workout: WorkoutDetail) => {
            return !workout.achieved;
        }
    );
    const result = {
        achieved: achievedWorkout,
        onGoing: onGoingWorkout,
    };
    return result;
};

export const calculateKcalForWorkout = (workouts: WorkoutDetail[]): number => {
    let totalKcal = 0;
    workouts.forEach((workout: { calories: number }) => {
        totalKcal += workout.calories;
    });
    return totalKcal;
};

export const updateWorkoutStatus = async (
    userId: string,
    date: Date,
    name: string,
    achieved: boolean
) => {
    console.log("Update Workout Status Function");
    const formattedDate = formatDateFromInput(date);
    const response = await axios.put("/api/update-workout-achievement", {
        userId,
        date: formattedDate,
        name,
        achieved,
    });
    return response.data;
};
