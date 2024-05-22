import UsersModel from "@/models/Users";
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
            const userDataMongo = await UsersModel.findOne({
                username: username,
            });
            console.log(userDataMongo);
        }
    } catch (error) {
        console.log(error);
    }
}
