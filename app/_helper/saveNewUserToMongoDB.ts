import UserModel from "@/models/User";

type newUserDataType = {
    email: string;
    username: string;
    isLoggedIn: boolean;
};

const saveNewUserToMongoDB = async (newUserData: newUserDataType) => {
    if (newUserData) {
        try {
            console.log("UserModel:", UserModel);
            const newUser = new UserModel(newUserData);
            console.log(newUser);
            console.log(newUser instanceof UserModel);
            await newUser.save();
            console.log("success");
        } catch (error) {
            console.log(
                "Error while storing new user data from MongoDB",
                error
            );
        }
    }
};

export default saveNewUserToMongoDB;
