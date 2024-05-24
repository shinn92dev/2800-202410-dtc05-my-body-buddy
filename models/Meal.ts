import { Schema, model, models } from 'mongoose';

const MealItemSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, min: 0.01 ,required: false },
  unit: { type: String, required: false },
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
