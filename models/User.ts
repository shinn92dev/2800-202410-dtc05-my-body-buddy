import mongoose from "mongoose";
import { date } from "yup";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
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
});

if (mongoose.models && mongoose.models["User"]) {
  delete mongoose.models["User"];
}
const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;
