import LoginForm from "@/components/login/LoginForm";
import GoogleIcon from "@/components/global/icons/GoogleIcon";
import LoginWrapper from "@/components/login/LoginWrapper";
import { authenticateUserAfterLogin } from "@/app/_helper/authenticateUser";
export const metadata = {
    title: "Log In",
};

export default async function LogIn() {
    await authenticateUserAfterLogin();
    return (
        <div className="flex flex-col w-full">
            <LoginWrapper />
        </div>
    );
}
