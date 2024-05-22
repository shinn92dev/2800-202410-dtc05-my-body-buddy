import mongoose, { Document, Schema } from 'mongoose';

interface IMealItem extends Document {
  name: string;
  amount: string;
  calories: number;
}

const MealItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true },
  calories: { type: Number, required: true },
});

export default mongoose.models.MealItem || mongoose.model<IMealItem>('MealItem', MealItemSchema);
