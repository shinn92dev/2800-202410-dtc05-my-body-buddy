import { connectMongoDB } from "@/config/db";
import WorkoutModel from "@/models/Workout";
import { format } from "date-fns";
import axios from "axios";
import { TRACE_OUTPUT_VERSION } from "next/dist/shared/lib/constants";

// Parameter: workout date from MongoDB
const formatDateFromMongoDB = (date: Date) => {
    return new Date(date).toISOString().split("T")[0];
};
// Parameter: workout date from User
export const formatDateFromInput = (date: Date) => {
    return format(date, "yyyy-MM-dd");
};

// export const fetchWorkoutForSpecificDate = (workoutData: any, date: Date) => {
//     console.log(date, "FROM fetch Workout For");
//     console.log(formatDateFromInput(date), "FROM fetch Workout For User Input");

//     const workoutForToday = workoutData.workouts.filter((workout) => {
//         const dateFromMongoDB = formatDateFromMongoDB(workout.date);
//         console.log(formatDateFromMongoDB(workout.date), "DB");
//         const dateFromUser = formatDateFromInput(date);
//         return dateFromMongoDB == dateFromUser;
//     });
//     const achievedWorkouts = workoutForToday.flatMap((workout) =>
//         workout.workoutDetail.filter((detail) => detail.achieved)
//     );

//     const onGoingWorkouts = workoutForToday.flatMap((workout) =>
//         workout.workoutDetail.filter((detail) => !detail.achieved)
//     );

//     const result = {
//         achieved: achievedWorkouts,
//         onGoing: onGoingWorkouts,
//     };

//     console.log(result);
//     return result;
// };

export const fetchWorkoutForSpecificDate = (workoutData: any, date: string) => {
    const dailyWorkout = workoutData.workouts.find(
        (d: { date: { toISOString: () => string } }) => {
            const workoutDate = d.date.toISOString().split("T")[0];
            return workoutDate === date;
        }
    );
    if (!dailyWorkout) {
        return { achieved: [], onGoing: [] };
    }
    const achievedWorkout = dailyWorkout.workoutDetail.filter((workout) => {
        return workout.achieved;
    });
    const onGoingWorkout = dailyWorkout.workoutDetail.filter((workout) => {
        return !workout.achieved;
    });
    const result = {
        achieved: achievedWorkout,
        onGoing: onGoingWorkout,
    };
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
