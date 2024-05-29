// pages/user/[id].tsx
import UserProfileEditWrapper from "@/components/user_profile/UserProfileEditWrapper";
import { UserData } from "@/components/user_profile/UserProfile";
import { connectMongoDB } from "@/config/db";
import UserModel from "@/models/User";
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  await connectMongoDB();
  console.log("Connected to MongoDB");

  let userData: UserData | null = null;

  try {
    const user = await UserModel.findOne({ username: id });

    if (user) {
      userData = {
        name: user.username,
        age: user.age || "Please enter a number",
        gender: user.gender || "female or male",
        height: user.height || "Please enter a number",
        weight: user.weight || "Please enter a number",
        goalWeight: user.goalWeight || "Please enter a number",
        goalDay: user.goalDay || "year-month-date",
        goalCal: user.goalCal || "...Will be updated after saving...",
      };
    }
  } catch (error) {
    console.error(`Error fetching user data: ${error}`);
  }

  if (!userData) {
    return {
      notFound: true,
    };
  }

  return {
    props: { userData },
  };
};

export default function UserProfilePage({ userData }: { userData: UserData }) {
  return <UserProfileEditWrapper userData={userData} />;
}
