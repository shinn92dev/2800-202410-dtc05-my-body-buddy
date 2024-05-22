import { connectMongoDB } from "@/config/db";
import Introduction from "./introduction";
import Logo from "./logo";
import Encourage from "./encourage";
import Button from "./button";
import {
    getCurrentUserInformationFromClerk,
    getCurrentUserInformationFromMondoDB,
} from "../_helper/getCurrentUserInformation";

export const metadata = {
    title: "HOME",
};

export default async function Home() {
    await getCurrentUserInformationFromMondoDB();
    // console.log(typeof user);
    return (
        <div>
            <div
                className="bg-cover bg-center bg-no-repeat min-w-full flex flex-col items-center justify-center"
                style={{
                    backgroundImage:
                        "url('/healthy_people_temporal_image.png')",
                    backgroundSize: "cover", // fit the image to the container
                    color: "black",
                }}
            >
                <Introduction />
            </div>
            <Logo />
            <Encourage />
            <Button />
        </div>
    );
}
