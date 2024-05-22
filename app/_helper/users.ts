import UserModel from "@/models/User";

export const GetCurrentUsersFromMongoDB = async () => {
    try {
        const testUser = {
            username: "shinn92dev",
            email: "shinn92dev@gmail.com",
            password: "1234",
            securityQuestion: "aaa",
            securityAnswer: "bbb",
        };
        const user = await UserModel.findOne({ email: testUser.email });
        if (user) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(user)),
            };
        }
        const newUser = new UserModel(testUser);
        await newUser.save();
        console.log("User Saved");
        return {
            success: true,
            data: JSON.parse(JSON.stringify(newUser)),
        };
    } catch (error) {
        return {
            success: false,
            error: error,
            message: "Error while fetching user data from MongoDB",
        };
    }
};
