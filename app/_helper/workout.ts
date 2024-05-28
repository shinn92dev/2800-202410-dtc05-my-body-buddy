import { format } from "date-fns";

// Parameter: workout date from MongoDB
const formatDateFromMongoDB = (date: Date) => {
    return new Date(date).toISOString().split("T")[0];
};
// Parameter: workout date from User
const formatDateFromInput = (date: Date) => {
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
        totalKcal += workout.cals;
    });
    return totalKcal;
};
