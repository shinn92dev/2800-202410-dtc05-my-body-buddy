import { format } from "date-fns";
import axios from "axios";
import { WorkoutData, WorkoutDetail } from "@/config/types";

// Convert a date from MongoDB to a string in yyyy-MM-dd format
// Parameter: workout date from MongoDB
const formatDateFromMongoDB = (date: Date): string => {
    return new Date(date).toISOString().split("T")[0];
};

// Convert a date from user input to a string in yyyy-MM-dd format
// Params: workout date from User
export const formatDateFromInput = (date: Date): string => {
    return format(date, "yyyy-MM-dd");
};

// Filter workouts for a specific date, returning achieved and ongoing workouts
// params:
// - workoutdata: workout data object
// - date: string date
export const filterWorkoutForSpecificDate = (
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

// Calculate the total calories burned from a list of workouts
// Params: workouts workout Detail array
export const calculateKcalForWorkout = (workouts: WorkoutDetail[]): number => {
    let totalKcal = 0;
    workouts.forEach((workout: { calories: number }) => {
        totalKcal += workout.calories;
    });
    return totalKcal;
};

// Update the achievement status of a specific workout for a user on a given date
// Params:
// - userId: user session id
// - date: Date object
// - name: workout name
// - achieved: achieved status
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
