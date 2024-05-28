import { GetServerSideProps } from "next";
import UserProfile, { UserData } from "@/components/user_profile/UserProfile";
import { connectMongoDB } from "@/config/db";
import UserModel from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { fetchUserId } from "@/app/_helper/fetchUserId";

interface UserProfileWrapperProps {
  userData: UserData | null;
}

const UserProfileWrapper: React.FC<UserProfileWrapperProps> = ({
  userData,
}) => {
  return <UserProfile userData={userData} />;
};

export default UserProfileWrapper;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const { userId } = getAuth(req);

  if (!userId) {
    return {
      redirect: {
        destination: "/login", // Redirect to login if user is not authenticated
        permanent: false,
      },
    };
  }

  await fetchUserId();
  await connectMongoDB();

  let userData: UserData | null = null;

  try {
    const user = await UserModel.findOne({ userId });

    if (user) {
      userData = {
        name: user.username,
        age: user.age || "N/A",
        gender: user.gender || "N/A",
        height: user.height || "N/A",
        weight: user.weight || "N/A",
        goalWeight: user.goalWeight || "N/A",
        goalDay: user.goalDay || "N/A",
        goalCal: user.goalCal || "N/A",
      };
    }
  } catch (error) {
    console.error(`Error fetching user data: ${error}`);
  }

  return {
    props: {
      userData,
    },
  };
};
