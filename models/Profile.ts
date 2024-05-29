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
    targetWeight: {
        type: Number,
        required: false,
    },
    targetDate: {
        type: Date,
        required: false,
    },
});

profileSchema.path('targetWeight').validate(function(value) {
    // Both should be either set or unset
    return (value != null && this.targetDate != null) || (value == null && this.targetDate == null);
}, 'Both targetWeight and targetDate must be set together or both unset.');

profileSchema.path('targetDate').validate(function(value) {
    // Both should be either set or unset
    return (value != null && this.targetWeight != null) || (value == null && this.targetWeight == null);
}, 'Both targetWeight and targetDate must be set together or both unset.');

const Profile = models.Profile || model('Profile', profileSchema);

export default Profile;
