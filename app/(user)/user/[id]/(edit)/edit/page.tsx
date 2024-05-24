import UserProfileEditWrapper from "@/components/user_profile/UserProfileEditWrapper";
import { UserData } from "@/components/user_profile/UserProfileWrapper";
import { connectMongoDB } from "@/config/db";
import UserModel from "@/models/User";

export default async function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  await connectMongoDB();
  console.log("connected to MongoDB");

  let userData: UserData | null = null;

  try {
    const user = await UserModel.findOne({ username: id });

    if (user) {
      userData = {
        name: user.username,
        age: user.age || "Please ender a number",
        gender: user.gender || "female or male",
        height: user.height || "Please ender a number",
        weight: user.weight || "Please ender a number",
        goalWeight: user.goalWeight || "Please ender a number",
        goalDay: user.goalDay || "year-month-date",
        goalCal: user.goalCal || "...Will be updated after saving...",
      };
    }
  } catch (error) {
    console.error(`Error fetching user data: ${error}`);
  }

  if (!userData) {
    return <h2 className="text-center font-bold">{id} not found</h2>;
  }

  return <UserProfileEditWrapper userData={userData} />;
}
