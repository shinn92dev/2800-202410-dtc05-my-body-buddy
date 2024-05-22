import { connectMongoDB } from "@/config/db";
import UserModel from "@/models/User";

const checkDuplicatedUser = async (email: string, username: string) => {
    connectMongoDB();
    const sameEmail = await UserModel.findOne({ email: email });
    const sameUsername = await UserModel.findOne({ username: username });
    if (!sameEmail && !sameUsername) {
        return { isDuplicatedUser: false, errorMessages: {} };
    }
    const errorMessages = {};
    if (sameEmail) {
        errorMessages.email =
            "Already registered email. Please use another one.";
    }
    if (sameUsername) {
        errorMessages.username =
            "Already registered username. Please use another one.";
    }
    return { isDuplicatedUser: true, errorMessages: errorMessages };
};

export default checkDuplicatedUser;
