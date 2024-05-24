import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
  isLoggedIn: {
    type: Boolean,
    required: true,
  },
  age: {
    type: Number,
    required: false,
    unique: false,
  },
  gender: {
    type: String,
    required: false,
    unique: false,
  },
  height: {
    type: Number,
    required: false,
    unique: false,
  },
  weight: {
    type: Number,
    required: false,
    unique: false,
  },
  goalWeight: {
    type: Number,
    required: false,
    unique: false,
  },
  goalDay: {
    type: String,
    required: false,
    unique: false,
  },
});

if (mongoose.models && mongoose.models["User"]) {
  delete mongoose.models["User"];
}
const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;
