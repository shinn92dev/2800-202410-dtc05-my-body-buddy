import mongoose from 'mongoose';

const workoutDetailSchema = new mongoose.Schema({
    title: { type: String, required: true },
    cals: { type: Number, required: true },
    unit: { type: String, required: true },
    count: { type: Number, required: true },
    achieved: { type: Boolean, default: false },
});

const workoutSchema = new mongoose.Schema({
    userId: { type: String, ref: 'User', required: true },
    workouts: [
        {
            date: { type: Date, required: true },
            workoutDetail: [workoutDetailSchema],
        },
    ],
});

const WorkoutModel = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
export default WorkoutModel;
