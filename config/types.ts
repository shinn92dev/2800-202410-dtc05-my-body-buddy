// Workout Related Types
export interface WorkoutDetail {
    name: string;
    calories: number;
    unit: string;
    quantity: number;
    achieved: boolean;
}

export interface Workout {
    date: Date;
    workoutDetail: WorkoutDetail[];
}

export interface WorkoutData {
    userId: string;
    workouts: Workout[];
}
