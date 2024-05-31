import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { connectMongoDB } from "@/config/db";
import Profile from "@/models/Profile";
import Target from "@/models/Target";

const authenticateUser = async () => {
    const { userId } = auth();
    if (!userId) {
        redirect("/login");
    }

    await connectMongoDB();

    const profile = await Profile.findOne({ userId });

    if (!profile) {
        redirect("/profile/edit");
    }

    const target = await Target.findOne({ userId });

    if (!target) {
        redirect("/profile/set-target");
    }
};

const authenticateUserAfterLogin = async () => {
    const { userId } = auth();

    if (userId) {
        redirect("/");
    }
}

export default authenticateUser;

export { authenticateUserAfterLogin };
