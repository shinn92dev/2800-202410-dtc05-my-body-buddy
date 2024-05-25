import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

const authenticateUser = () => {
    const { userId } = auth();
    if (!userId) {
        redirect('/');
    }
}

export default authenticateUser;