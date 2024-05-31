import SetTargetWrapper from "@/components/profile_set_target/SetTargetWrapper";
import ProfileEditWrapper from "@/components/profile_edit/ProfileEditWrapper";
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { connectMongoDB } from '@/config/db';
import Profile from '@/models/Profile';
import Target from '@/models/Target';

const authenticateUser = async () => {
    const { userId } = auth();
    if (!userId) {
        redirect('/');
    }

    await connectMongoDB();

    const user = await Profile.findOne({ userId });

    if (!user) {
        redirect('/profile/edit');
    }
  }

export const metadata = {
  title: "Set Target",
};

export default async function UserProfilePage() {
  await authenticateUser();
  return <SetTargetWrapper />;
}
