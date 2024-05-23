import WorkoutModel from "@/models/Workout";

type DetailedWorkoutDataType = {
    date: Date;
    workout: {
        title: string;
        unit: string;
        count: number;
        achieved: boolean;
    };
};

type WorkoutDataType = {
    username: string;
    workout: DetailedWorkoutDataType[];
};

// newWorkoutData must be type of DetailedWorkoutDataType
export const saveWorkoutMongoDB = async (
    username: string,
    newWorkoutData: DetailedWorkoutDataType
) => {
    if (newWorkoutData) {
        try {
            console.log("WorkoutData: ", newWorkoutData);
            const currentUser = await WorkoutModel.findOneAndUpdate(
                {
                    username: username,
                },
                { $push: { workout: newWorkoutData } }
            );
            console.log("New workout saved successfully for ", username, ": ");
            console.log(currentUser);
        } catch (error) {
            console.log("Error while saving workout data");
        }
    }
};

export const retrieveWorkout = async (username: string) => {
    try {
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
