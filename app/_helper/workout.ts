import { connectMongoDB } from "@/config/db";
import WorkoutModel from "@/models/Workout";
import { format } from "date-fns";
import axios from "axios";

// Parameter: workout date from MongoDB
const formatDateFromMongoDB = (date: Date) => {
    return new Date(date).toISOString().split("T")[0];
};
// Parameter: workout date from User
export const formatDateFromInput = (date: Date) => {
    return format(date, "yyyy-MM-dd");
};

export const fetchWorkoutForSpecificDate = (workoutDate: any, date: Date) => {
    const workoutForToday = workoutDate.workouts.filter((workout) => {
        const dateFromMongoDB = formatDateFromMongoDB(workout.date);
        const dateFromUser = formatDateFromInput(date);
        return dateFromMongoDB == dateFromUser;
    });
    const achievedWorkouts = workoutForToday.flatMap((workout) =>
        workout.workoutDetail.filter((detail) => detail.achieved)
    );

    const onGoingWorkouts = workoutForToday.flatMap((workout) =>
        workout.workoutDetail.filter((detail) => !detail.achieved)
    );

    const result = {
        achieved: achievedWorkouts,
        onGoing: onGoingWorkouts,
    };

    console.log(result);
    return result;
};

export const calculateKcalForWorkout = (workouts: any) => {
    let totalKcal = 0;
    workouts.forEach((workout) => {
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
