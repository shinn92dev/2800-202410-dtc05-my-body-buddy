import React from 'react';
import { useRouter } from 'next/navigation';

interface AskAiButtonProps {
    onClick: () => void;
    forText: string;
}

import Image from 'next/image';

const AskAiButton: React.FC<AskAiButtonProps> = ({ onClick, forText }) => {
    const router = useRouter();

    return (
        <button
            onClick={onClick}
            className="flex items-center bg-gray-600 text-white py-2 px-4 rounded-full hover:bg-gray-700"
        >
            <span className="mr-1">Ask AI for {forText}</span>
            <Image src="/my_boddy_buddy_support_ai_logo.jpg" alt="AI Logo" className="ml-2" width={24} height={24}/>
        </button>
    );
};

export default AskAiButton;