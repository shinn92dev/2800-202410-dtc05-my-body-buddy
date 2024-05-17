import React from "react";

const Button = () => {
    return (
        <div className="flex justify-center space-x-4 p-8">
            <a href="/signup">
                <button className="bg-logo-pumpkin text-white font-bold py-2 px-4 rounded">
                    Sign Up
                </button>
            </a>
            <a href="/login">
                <button className="bg-orange text-white font-bold py-2 px-4 rounded">
                    Log In
                </button>
            </a>
        </div>
    );
};

export default Button;
