import InputBox from "@/components/global/InputBox";
import GoogleIcon from "@/components/global/icons/GoogleIcon";
import SignUpAndInIcon from "@/components/global/icons/SignUpAndInIcon";
import Image from "next/image";

export const metadata = {
    title: "Log In",
};

export default function LogIn() {
    return (
        <div className="min-h-screen">
            <h1 className="text-2xl font-bold p-2 m-2">
                This is My Body Buddy SignUp page
            </h1>
            <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div>
                            <Image
                                src="/images/logo/my_body_buddy_logo.png"
                                alt="My Body Buddy Logo"
                                width={32}
                                height={32}
                                quality={100}
                                className="w-32 mx-auto"
                            ></Image>
                        </div>
                        <div className="mt-12 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold">
                                Sign up for My Body Buddy🏃‍♂️
                            </h1>
                            <div className="w-full flex-1 mt-8">
                                {/* Login form */}
                                <form className="mx-auto max-w-xs">
                                    {/* Email */}
                                    <InputBox
                                        labelText="Email"
                                        id="email"
                                        hidden={true}
                                        type="email"
                                        placeholder="Email"
                                        isTop={true}
                                    />
                                    {/* Password */}
                                    <InputBox
                                        labelText="Password"
                                        id="password"
                                        hidden={true}
                                        type="password"
                                        placeholder="Password"
                                        isTop={false}
                                    />
                                    <button className="mt-2 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <SignUpAndInIcon width={6} />
                                        <span className="ml-3">Log In</span>
                                    </button>
                                </form>
                                {/* Divide bar */}
                                <div className="my-7 border-b text-center">
                                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Or log in Google
                                    </div>
                                </div>
                                {/* Google Button */}
                                <div className="flex flex-col items-center">
                                    <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 hover:bg-indigo-200 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none focus:shadow-sm focus:shadow-outline">
                                        <div className="bg-white p-2 rounded-full">
                                            <GoogleIcon width={4} />
                                        </div>
                                        <span className="ml-4">
                                            Log In with Google
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                        <div
                            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage:
                                    "url('https://www.sheknows.com/wp-content/uploads/2021/08/body-weight-workouts.png')",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
