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

if (mongoose.models && mongoose.models["Users"]) {
    delete mongoose.models["Users"];
}
const UsersModel = mongoose.model("Users", usersSchema);
export default UsersModel;
