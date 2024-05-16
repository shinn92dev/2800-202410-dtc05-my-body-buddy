import UsersModel from "@/models/Users";

export const GetCurrentUsersFromMongoDB = async () => {
    try {
        const testUser = {
            username: "shinn92dev",
            email: "shinn92dev@gmail.com",
            fullname: "Anthony Shin",
        };
        const user = await UsersModel.findOne({ email: testUser.email });
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
            messege: "Error while fetching user data from MongoDB",
        };
    }
};
