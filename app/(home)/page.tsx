import { connectMongoDB } from "@/config/db";
import { GetCurrentUsersFromMongoDB } from "../_helper/users";

connectMongoDB();

export const metadata = {
    title: "HOME",
};

export default async function Home() {
    await GetCurrentUsersFromMongoDB();
    return (
        <div>
            <h1 className="text-2xl font-bold p-2 m-2">
                This is My Body Buddy Home page
            </h1>
        </div>
    );
}
