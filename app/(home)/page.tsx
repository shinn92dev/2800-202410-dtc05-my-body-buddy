import Logo from "./logo";
import Encourage from "./encourage";
import Button from "./button";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const authenticateUser = () => {
    const { userId } = auth();
    if (userId) {
        redirect("/profile");
    }
}

export const metadata = {
    title: "HOME",
};

export default async function Home() {
    authenticateUser();

    return (
        <div className="flex flex-col items-center justify-center">
            <Encourage />
            <Logo />
            <Button />
        </div>
    );
}
