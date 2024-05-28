import { connectMongoDB } from "@/config/db";
import Logo from "./logo";
import Encourage from "./encourage";
import Button from "./button";

export const metadata = {
    title: "HOME",
};

export default async function Home() {
    return (
        <div className="flex flex-col items-center justify-center">
            <Encourage />
            <Logo />
            <Button />
        </div>
    );
}
