import UserModel from "@/models/User";

const fetchAllUserEmailAndNames = async () => {
    try {
        const usersInfo = await UserModel.find({}, { username: 1, email: 1 });
        console.log(usersInfo);
        return usersInfo;
    } catch (error) {
        console.log("Error while fetching and saving user data from MongoDB");
        console.log("Error: ", error);
    }
};

export default fetchAllUserEmailAndNames;
