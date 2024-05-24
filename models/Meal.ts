import mongoose, { Schema, model, models } from 'mongoose';

// Define the MealItem schema
const MealItemSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, min: 0.01, required: false },
  unit: { type: String, required: false },
  calories: { type: Number, required: true },
});

// Define the DailyMeal schema
const DailyMealSchema = new Schema({
  date: { type: Date, required: true, get: (value: Date) => new Date(value).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }) },
  breakfast: [MealItemSchema],
  lunch: [MealItemSchema],
  dinner: [MealItemSchema],
  snacks: [MealItemSchema],
});

// Define the main Meal schema
const MealSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  dailyMeals: [DailyMealSchema],
});

// Compile the model
const Meal = models.Meal || model('Meal', MealSchema);

export default Meal;
