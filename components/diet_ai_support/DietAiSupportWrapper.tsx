"use client";

import React, { useState } from 'react';
import AiLines from '@/components/global/AiLines';
import PreferencesForm from './PreferencesForm';
import PreferencesSummary from './PreferencesSummary';
import GeneratedMenu from './GeneratedMenu';

const DietAiSupportWrapper: React.FC = () => {
    const [preferences, setPreferences] = useState<any>(null);
    const [generated, setGenerated] = useState(false);

    const handleFormSubmit = (prefs: any) => {
        setPreferences(prefs);
        setGenerated(true);
    };

    const message: string = "Hi! I'm BODY BUDDY AI.\nI'll suggest a menu that includes the nutrients you should be taking.\n\nPlease fill out your preferences in the form below.";

    return (
        <div className="p-4 w-full max-w-lg">
            <AiLines messageBody={message} />
            {!generated && <PreferencesForm onSubmit={handleFormSubmit} />}
            {preferences && <PreferencesSummary preferences={preferences} />}
            {generated && <GeneratedMenu />}
        </div>
    );
};

export default DietAiSupportWrapper;
