import { connectMongoDB } from "@/config/db";
import WorkoutModel from "@/models/Workout";

type DetailedWorkoutDataType = {
    date: Date;
    workoutDetail: [
        {
            title: string;
            unit: string;
            count: number;
            achieved: boolean;
        }
    ];
};
type OneDayWorkoutType = {};
type WorkoutDataType = {
    username: string;
    workouts: DetailedWorkoutDataType[];
};

export const saveNewUserWorkoutMongoDB = async (
    workoutData: WorkoutDataType
) => {
    try {
        await connectMongoDB();
        const newUserWorkout = new WorkoutModel(workoutData);
        await newUserWorkout.save();
        console.log("WOrkout for new user saved successfully");
    } catch (error) {
        console.log("Error while saving new user workout data: ", error);
    }
};

// newWorkoutData must be type of DetailedWorkoutDataType
export const updateWorkoutMongoDB = async (
    username: string,
    newWorkoutData: DetailedWorkoutDataType
) => {
    if (newWorkoutData) {
        try {
            await connectMongoDB();
            console.log("WorkoutData: ", newWorkoutData);
            const currentUser = await WorkoutModel.findOneAndUpdate(
                {
                    username: username,
                },
                { $push: { workouts: newWorkoutData } }
            );
            console.log(
                "New workout updated successfully for ",
                username,
                ": "
            );
            console.log(currentUser);
        } catch (error) {
            console.log("Error while saving workout data");
        }
    }
};

export const retrieveWorkout = async (username: string) => {
    try {
        await connectMongoDB();
        const workoutForCurrentUser = await WorkoutModel.findOne({
            username: username,
        });
        console.log(
            "Workout for current user retrieved successfully for ",
            username,
            ": "
        );
        console.log(workoutForCurrentUser);
        return workoutForCurrentUser;
    } catch (error) {
        console.log("Error while retrieving workout");
        return null;
    }
};

export const filterWorkoutsByAchievement = (
    date: Date,
    workoutDetail: DetailedWorkoutDataType
) => {
    const filterYear = date.getFullYear();
    const filterMonth = date.getMonth();
    const filterDay = date.getDate();

    const workoutYear = workoutDetail.date.getFullYear();
    const workoutMonth = workoutDetail.date.getMonth();
    const workoutDay = workoutDetail.date.getDate();
    // Compare year, month, and day for equality
    if (
        filterYear !== workoutYear ||
        filterMonth !== workoutMonth ||
        filterDay !== workoutDay
    ) {
        console.log(
            "You gave this function wrong date of workout (considering only year, month, and day)"
        );
        return null;
    }
    const todaysWorkout = workoutDetail.workoutDetail;
    if (todaysWorkout) {
        const achievedWorkouts = todaysWorkout.filter(
            (workout) => workout.achieved
        );
        const onGoingWorkouts = todaysWorkout.filter(
            (workout) => !workout.achieved
        );
        return { achieved: achievedWorkouts, onGoing: onGoingWorkouts };
    } else {
        console.log(`Cannot find workout for ${date}`);
        return null;
    }
};
