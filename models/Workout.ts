import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    workouts: [
        {
            date: {
                type: Date,
                required: true,
            },
            workoutDetail: [
                {
                    title: {
                        type: String,
                        required: true,
                    },
                    unit: {
                        type: String,
                        required: true,
                    },
                    count: {
                        type: Number,
                        required: true,
                    },
                    achieved: {
                        type: Boolean,
                        required: true,
                    },
                },
            ],
        },
    ],
});

if (mongoose.models && mongoose.models["Workout"]) {
    delete mongoose.models["Workout"];
}
const WorkoutModel = mongoose.model("Workout", workoutSchema);
export default WorkoutModel;
