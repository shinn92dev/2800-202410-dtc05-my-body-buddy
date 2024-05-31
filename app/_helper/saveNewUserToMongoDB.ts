// _helper/saveNewUserToMongoDB.ts

import UserModel from "@/models/User";

type newUserDataType = {
    email: string;
    username: string;
    userId: string;
};

const saveNewUserToMongoDB = async (newUserData: newUserDataType) => {
    if (newUserData) {
        try {
            const newUser = new UserModel(newUserData);
            await newUser.save();
            console.log("User data saved successfully");
        } catch (error) {
            console.error("Error while storing new user data in MongoDB", error);
        }
    }
};

export default saveNewUserToMongoDB;
