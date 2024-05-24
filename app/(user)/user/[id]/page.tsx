import UserProfileWrapper from "@/components/user_profile/UserProfileWrapper";
import { UserData } from "@/components/user_profile/UserProfileWrapper";

export default async function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // Fetch user data from the API route
  const res = await fetch(`http://localhost:3000/api/user`);

  if (!res.ok) {
    return <h2 className="text-center font-bold">{id} not found</h2>;
  }

  const userData: UserData = await res.json();

  return <UserProfileWrapper userData={userData} />;
}
