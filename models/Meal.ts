import { Schema, model, models } from 'mongoose';

const MealItemSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true },
  calories: { type: Number, required: true },
});

const MealSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  breakfast: [MealItemSchema],
  lunch: [MealItemSchema],
  dinner: [MealItemSchema],
  snacks: [MealItemSchema]
});

const Meal = models.Meal || model('Meal', MealSchema);

export default Meal;
