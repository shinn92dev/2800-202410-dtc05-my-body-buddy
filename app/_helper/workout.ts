import { connectMongoDB } from "@/config/db";
import WorkoutModel from "@/models/Workout";

type DetailedWorkoutDataType = {
    date: Date;
    workoutDetail: [
        {
            title: string;
            cals: number;
            unit: string;
            count: number;
            achieved: boolean;
        }
    ];
};
type WorkoutDataType = {
    userId: string;
    workouts: DetailedWorkoutDataType[];
};

// Save new user's workout data to MongoDB
export const saveNewUserWorkoutMongoDB = async (
    workoutData: WorkoutDataType
) => {
    try {
        await connectMongoDB();
        const newUserWorkout = new WorkoutModel(workoutData);
        await newUserWorkout.save();
        console.log("Workout for new user saved successfully");
    } catch (error) {
        console.log("Error while saving new user workout data: ", error);
    }
};

// Update workout data for existing user
export const updateWorkoutMongoDB = async (
    userId: string,
    newWorkoutData: DetailedWorkoutDataType
) => {
    if (newWorkoutData) {
        try {
            await connectMongoDB();
            console.log("WorkoutData: ", newWorkoutData);
            await WorkoutModel.findOneAndUpdate(
                {
                    userId: userId,
                },
                { $push: { workouts: newWorkoutData } }
            );
            console.log(
                "New workout updated successfully for userId: ",
                userId
            );
        } catch (error) {
            console.log("Error while saving workout data: ", error);
        }
    }
};

// Retrieve workout data for the current user
export const retrieveWorkout = async (userId: string) => {
    try {
        await connectMongoDB();
        const workoutForCurrentUser = await WorkoutModel.findOne(
            {
                userId: userId,
            },
            { _id: 0 }
        );
        if (!workoutForCurrentUser) {
            console.log("No workout data found for userId: ", userId);
            return null;
        }
        console.log(
            "Workout for current user retrieved successfully for userId: ",
            userId
        );
        return workoutForCurrentUser;
    } catch (error) {
        console.log("Error while retrieving workout: ", error);
        return null;
    }
};

// Filter workouts for a specific day
export const filterSpecificDayWorkout = (date: Date, workouts: any) => {
    console.log("CHECK THIS OUTPUT:", workouts);
    if (!Array.isArray(workouts)) {
        return null;
    }
    const specificDayWorkout = workouts.filter(
        (workout: DetailedWorkoutDataType) => {
            return (
                workout.date.getUTCFullYear() === date.getUTCFullYear() &&
                workout.date.getUTCMonth() === date.getUTCMonth() &&
                workout.date.getUTCDate() === date.getUTCDate()
            );
        }
    );
    return specificDayWorkout[0];
};

// Filter workouts by achievement status
export const filterWorkoutsByAchievement = (date: Date, workoutDetail: any) => {
    const specificDayWorkout = filterSpecificDayWorkout(date, workoutDetail);
    if (!specificDayWorkout) {
        console.log(`Cannot find workout for ${date}`);
        return null;
    }
    const achievedWorkouts = specificDayWorkout.workoutDetail.filter(
        (workout: any) => workout.achieved
    );
    const onGoingWorkouts = specificDayWorkout.workoutDetail.filter(
        (workout: any) => !workout.achieved
    );
    console.log("FILTER FUNCTION DONE!");
    return { achieved: achievedWorkouts, onGoing: onGoingWorkouts };
};
