import { Schema, model, models } from 'mongoose';

const targetSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  targetCaloriesIntake: {
    type: Number,
    required: true,
  },
  targetCaloriesBurn: {
    type: Number,
    required: true,
  },
  targetWeight: {
    type: Number,
    required: false,
  },
  targetDate: {
    type: Date,
    required: false,
  },
});

targetSchema.path('targetWeight').validate(function(value) {
    // Both should be either set or unset
    return (value != null && this.targetDate != null) || (value == null && this.targetDate == null);
}, 'Both targetWeight and targetDate must be set together or both unset.');

targetSchema.path('targetDate').validate(function(value) {
    // Both should be either set or unset
    return (value != null && this.targetWeight != null) || (value == null && this.targetWeight == null);
}, 'Both targetWeight and targetDate must be set together or both unset.');


const Target = models.Calorie || model('Target', targetSchema);

export default Target;
