import LoginForm from "@/components/login/LoginForm";
import GoogleIcon from "@/components/global/icons/GoogleIcon";
import LoginWrapper from "@/components/login/LoginWrapper";
export const metadata = {
    title: "Log In",
};

export default function LogIn() {
    return (
        <div className="flex flex-col w-full">
            <LoginWrapper />
        </div>
    );
}
