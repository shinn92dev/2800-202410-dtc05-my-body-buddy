import React from 'react';
import { useRouter } from 'next/navigation';

interface AskAiButtonProps {
    forText: string;
    icon: React.ReactNode;
    onClick: () => void;
}

const AskAiButton: React.FC<AskAiButtonProps> = ({ forText, icon, onClick }) => {
    const router = useRouter();

    return (
        <button
            onClick={onClick}
            className="flex items-center bg-dark-blue text-white py-2 px-4 rounded-full hover:bg-dark-blue/80"
        >
            <span className="mr-2 text-2xl font-semibold">Ask AI for {forText}</span>
            <span>{icon}</span>
        </button>
    );
};

export default AskAiButton;
