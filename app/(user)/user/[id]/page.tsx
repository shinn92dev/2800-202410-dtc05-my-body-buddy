import UserProfileWrapper from "@/components/user_profile/UserProfileWrapper";

export default async function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // Fetch user data from the API route
  const res = await fetch(`http://localhost:3000/api/user`);
  const userData = await res.json();

  if (!res.ok) {
    return <h2 className="text-center font-bold">{id} not found</h2>;
  }

  return <UserProfileWrapper userData={userData} />;
}
