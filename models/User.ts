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
});

if (mongoose.models && mongoose.models["User"]) {
  delete mongoose.models["User"];
}
const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;
