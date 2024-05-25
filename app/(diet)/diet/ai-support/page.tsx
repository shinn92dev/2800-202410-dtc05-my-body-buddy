import React from 'react';
import DietAiSupportWrapper from '@/components/diet_ai_support/DietAiSupportWrapper';
import authenticateUser from '@/app/_helper/authenticateUser';

export const metadata = { 
    title: "Diet AI Support",
};

const DietAiSupportPage: React.FC = () => {
    authenticateUser();
    return (
        <div className="min-h-screen flex items-center justify-center">
            <DietAiSupportWrapper />
        </div>
    );
};

export default DietAiSupportPage;
