import { Schema, model, models } from 'mongoose';

const profileSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    goalWeight: {
        type: Number,
        required: false,
    },
    goalDate: {
        type: Date,
        required: false,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

profileSchema.path('goalWeight').validate(function(value) {
    return (value && this.goalDate) || (!value && !this.goalDate);
}, 'Both goalWeight and goalDate must be set together or both unset.');

profileSchema.path('goalDate').validate(function(value) {
    return (value && this.goalWeight) || (!value && !this.goalWeight);
}, 'Both goalWeight and goalDate must be set together or both unset.');

const Profile = models.Profile || model('Profile', profileSchema);

export default Profile;
