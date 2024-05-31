import ProfileEditWrapper from "@/components/profile_edit/ProfileEditWrapper";
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

const authenticateUser = async () => {
    const { userId } = auth();
    if (!userId) {
        redirect('/');
    }
}

export const metadata = {
  title: "Edit Profile",
};

export default async function UserProfileEditPage() {
  await authenticateUser();
  return <ProfileEditWrapper />;
}
