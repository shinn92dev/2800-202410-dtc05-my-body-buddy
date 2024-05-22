import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    securityQuestion: {
        type: String,
        required: true,
    },
    securityAnswer: {
        type: String,
        required: true,
    },
});

if (mongoose.models && mongoose.models["User"]) {
    delete mongoose.models["User"];
}
const UserModel = mongoose.model("User", usersSchema);
export default UserModel;
