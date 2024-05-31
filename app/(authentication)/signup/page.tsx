import SignupWrapper from "@/components/signup/SignupWrapper";
import { authenticateUserAfterLogin } from "@/app/_helper/authenticateUser";

export const metadata = {
    title: "Sign Up",
};

export default async function Signup() {
    await authenticateUserAfterLogin();
    return (
        <div className="flex flex-col w-full">
            <SignupWrapper />
        </div>
    );
}