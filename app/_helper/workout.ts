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

export const filterSpecificDayWorkout = (date: Date, workouts: any) => {
    console.log("CHECK THIS OUTPUT:", workouts);
    if (!Array.isArray(workouts)) {
        return null;
    }
    const specificDayWorkout = workouts.filter(
        (workout: DetailedWorkoutDataType) => {
            return (
                workout.date.getFullYear() === date.getFullYear() &&
                workout.date.getMonth() === date.getMonth() &&
                workout.date.getDate() === date.getDate()
            );
        }
    );
    return specificDayWorkout[0];
};

export const filterWorkoutsByAchievement = (date: Date, workoutDetail: any) => {
    const specificDayWorkout = filterSpecificDayWorkout(date, workoutDetail);
    const filterYear = date.getFullYear();
    const filterMonth = date.getMonth();
    const filterDay = date.getDate();
    console.log("CHECK HERE NOW:", specificDayWorkout);
    const workoutYear = specificDayWorkout?.date.getFullYear();
    const workoutMonth = specificDayWorkout?.date.getMonth();
    const workoutDay = specificDayWorkout?.date.getDate();
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
    if (specificDayWorkout) {
        const achievedWorkouts = specificDayWorkout.workoutDetail.filter(
            (workout) => workout.achieved
        );
        const onGoingWorkouts = specificDayWorkout.workoutDetail.filter(
            (workout) => !workout.achieved
        );
        return { achieved: achievedWorkouts, onGoing: onGoingWorkouts };
    } else {
        console.log(`Cannot find workout for ${date}`);
        return null;
    }
};
