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
});

const Profile = models.Profile || model('Profile', profileSchema);

export default Profile;
