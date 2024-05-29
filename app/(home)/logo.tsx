import React from "react";
import Image from "next/image";

const Logo = () => {
    return (
        <div className="flex flex-col items-center justify-center py-4 m-4">
            <Image src="/my_body_buddy_logo.png" alt="My Body Buddy Logo" 
            className="w-40 h-40 rounded shadow-lg"
            width={80}
            height={80}/>
        </div>
    );
};

export default Logo;
