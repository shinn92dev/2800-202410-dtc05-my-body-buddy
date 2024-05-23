import React from 'react';
import DietAiSupportWrapper from '@/components/diet_ai_support/DietAiSupportWrapper';

export const metadata = { 
    title: "Diet AI Support",
};

const DietAiSupportPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <DietAiSupportWrapper />
        </div>
    );
};

export default DietAiSupportPage;
