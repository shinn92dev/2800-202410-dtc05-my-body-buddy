import UsersModel from "@/models/Users";

type newUserDataType = {
    email: string;
    username: string;
    isLoggedIn: boolean;
};

const saveNewUserToMongoDB = async (newUserData: newUserDataType) => {
    if (newUserData) {
        try {
            console.log("UsersModel:", UsersModel);
            const newUser = new UsersModel(newUserData);
            console.log(newUser);
            console.log(newUser instanceof UsersModel);
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
