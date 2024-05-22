import { Schema, model, models } from 'mongoose';

const MealSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  breakfast: [{ type: Schema.Types.ObjectId, ref: 'MealItem' }],
  lunch: [{ type: Schema.Types.ObjectId, ref: 'MealItem' }],
  dinner: [{ type: Schema.Types.ObjectId, ref: 'MealItem' }],
  snacks: [{ type: Schema.Types.ObjectId, ref: 'MealItem' }]
});

const Meal = models.Meal || model('Meal', MealSchema);

export default Meal;
