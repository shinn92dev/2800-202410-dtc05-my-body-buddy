import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
export const fetchUserId = async (): Promise<string> => {
    try {
        const response = await axios.get("/api/get-user-id");
        return response.data.userId;
    } catch (error) {
        console.error("Error fetching user ID:", (error as Error).message);
        throw error;
    }
};

export const useCurrentUserInformation = () => {
    const { isLoaded, user } = useUser();

    if (!isLoaded || !user) {
        return { isLoaded: false, user: null };
    }
    return {
        isLoaded,
        user: {
            email: user.primaryEmailAddress.emailAddress,
            username: user.username,
            userId: user.id,
        },
    };
};
