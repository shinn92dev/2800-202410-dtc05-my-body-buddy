import UserModel from "@/models/User";
import { currentUser } from "@clerk/nextjs/server";

export async function getCurrentUserInformationFromClerk() {
    const user = await currentUser();

    if (!user) return;
    return user;
}

export async function getCurrentUserInformationFromMondoDB() {
    try {
        const clerkUser = await getCurrentUserInformationFromClerk();
        console.log(clerkUser);
        if (clerkUser) {
            const username = clerkUser?.username;
            const userDataMongo = await UserModel.findOne({
                username: username,
            });
            return userDataMongo;
        }
        return;
    } catch (error) {
        console.log(error);
    }
}
