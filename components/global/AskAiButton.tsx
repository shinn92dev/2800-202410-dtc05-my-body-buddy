import React from 'react';
import { useRouter } from 'next/navigation';

interface AskAiButtonProps {
    forText: string;
}

const AskAiButton: React.FC<AskAiButtonProps> = ({ forText }) => {
    const router = useRouter();

    const handleClick = () => {
        // Navigate to the AskAiFor<forText> page
        router.push(`/AskAiFor${forText}`);
    };

    return (
        <button
            onClick={handleClick}
            className="flex items-center bg-gray-600 text-white py-2 px-4 rounded-full hover:bg-gray-700"
        >
            <span className="mr-1">Ask AI for {forText}</span>
            <span className="text-2xl">🤖</span>
        </button>
    );
};

export default AskAiButton;