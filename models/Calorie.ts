import { Schema, model, models } from 'mongoose';

const calorieSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  caloriesIntake: {
    type: Number,
    required: true,
  },
  caloriesBurn: {
    type: Number,
    required: true,
  },
  activityLevel: {
    type: Number,
    required: true,
  },
});

const Calorie = models.Calorie || model('Calorie', calorieSchema);

export default Calorie;
