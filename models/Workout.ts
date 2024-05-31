import mongoose from "mongoose";

const workoutDetailSchema = new mongoose.Schema({
    name: { type: String, required: false },
    calories: { type: Number, required: false },
    unit: { type: String, required: false },
    quantity: { type: Number, required: false },
    achieved: { type: Boolean, default: false },
});

const workoutSchema = new mongoose.Schema({
    userId: { type: String, ref: "User", required: true },
    workouts: [
        {
            date: { type: Date, required: false },
            workoutDetail: [workoutDetailSchema],
        },
    ],
});

const WorkoutModel =
    mongoose.models.Workout || mongoose.model("Workout", workoutSchema);
export default WorkoutModel;
