import UsersModel from "@/models/Users";

export const getAllFromMongoDB = async () => {
    try {
        const testUser = {
            username: "shinn92dev",
            email: "shinn92dev@gmail.com",
            password: "1234",
            securityQuestion: "aaa",
            securityAnswer: "bbb",
        };
        const user = await UsersModel.find({});
        if (user) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(user)),
            };
        }
        const newUser = new UsersModel(testUser);
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
