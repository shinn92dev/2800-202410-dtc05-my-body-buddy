import React from "react";
import Image from "next/image";

const Logo = () => {
    return (
        <div className="flex flex-col items-center justify-center py-4 m-4">
            <Image
                src="/my_body_buddy_logo.png"
                alt="My Body Buddy Logo"
                className="rounded shadow-lg"
                width={150}
                height={150}
            />
        </div>
    );
};

export default Logo;
