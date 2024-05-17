import { connectMongoDB } from "@/config/db";
import { GetCurrentUsersFromMongoDB } from "../_helper/users";
import Introduction from "./introduction";
import Logo from "./logo";

connectMongoDB();

export const metadata = {
    title: "HOME",
};

export default async function Home() {
    await GetCurrentUsersFromMongoDB();
    return (
        <div>
            <div className="bg-cover bg-center bg-no-repeat min-w-full flex flex-col items-center justify-center" style={{
                backgroundImage: "url('/healthy_people_temporal_image.png')",
                backgroundSize: "cover", // fit the image to the container
                color: "black",
            }}>
                <Introduction />
            </div>
            <Logo />
        </div>
    );
}
