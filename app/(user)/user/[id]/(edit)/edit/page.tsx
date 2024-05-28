<<<<<<< HEAD
import UserProfileEditWrapper from "@/components/user_profile/UserProfileEditWrapper";
import { UserData } from "@/components/user_profile/UserProfileWrapper";
import { connectMongoDB } from "@/config/db";
import UserModel from "@/models/User";
=======
<<<<<<< HEAD
"use client";
>>>>>>> 72361cb (Add edit input form)

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
        age: user.age || "N/A",
        gender: user.gender || "N/A",
        height: user.height || "N/A",
        weight: user.weight || "N/A",
        goalWeight: user.goalWeight || "N/A",
        goalDay: user.goalDay || "year-month-date",
        goalCal: user.goalCal || "N/A",
      };
    }
  } catch (error) {
    console.error(`Error fetching user data: ${error}`);
  }

  if (!userData) {
    return <h2 className="text-center font-bold">{id} not found</h2>;
  }

<<<<<<< HEAD
  return <UserProfileEditWrapper userData={userData} />;
=======
    return (
        <div className="justify-center">
            <h2 className="font-bold text-2xl tracking-wide text-center">
                My Profile
            </h2>
            <div
                id="basic-info"
                className="m-5 tracking-wide leading-8 font-semibold text-center justify-center"
            >
                👤
                <div>Name: {userData.name}</div>
                <div>Age: {userData.age}</div>
                <div>Gender: {userData.gender}</div>
                <div>Height: {userData.height} cm</div>
                <div>Weight: {userData.weight} kg</div>
                <br />
                🙌
                <div>Target Date: {userData.goalDay}</div>
                <div>Target Weight: {userData.goalWight} kg</div>
            </div>
            <div className="flex justify-center">
                <Link
                    href={`/user/${userData.name}`}
                    className="bg-dark-blue rounded-md px-3 py-2 text-beige m-10"
                >
                    Done
                </Link>
            </div>
        </div>
    );
=======
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

  if (!userData) {
    return <h2 className="text-center font-bold">{id} not found</h2>;
  }

  return <UserProfileEditWrapper userData={userData} />;
>>>>>>> 6f91bd5 (Add edit input form)
>>>>>>> 72361cb (Add edit input form)
}
