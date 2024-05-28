import React from "react";

const Button = () => {
    return (
        <div className="flex justify-center flex-col p-8">
            <a href="/signup" className="flex-1">
                <button className="w-full min-w-[150px] bg-logo-pumpkin hover:bg-orange-600 text-white font-bold py-3 px-6 mb-4 rounded-full shadow-md transition duration-300">
                    Sign Up
                </button>
            </a>
            <a href="/login" className="flex-1">
                <button className="w-full min-w-[150px] bg-dark-blue hover:bg-blue-600 text-white font-bold py-3 px-6 mb-4 rounded-full shadow-md transition duration-300">
                    Log In
                </button>
            </a>
        </div>
    );
};

export default Button;
