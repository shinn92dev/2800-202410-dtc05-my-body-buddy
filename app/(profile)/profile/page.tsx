import ProfileWrapper from "@/components/profile/ProfileWrapper";
import authenticateUser from "@/app/_helper/authenticateUser";

export const metadata = {
  title: "User Profile",
};

export default async function UserProfilePage() {
  await authenticateUser();
  return <ProfileWrapper />;
}
