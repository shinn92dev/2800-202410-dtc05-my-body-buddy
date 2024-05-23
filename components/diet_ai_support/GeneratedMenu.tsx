import React from 'react';
import AiLines from '@/components/global/AiLines';

type GeneratedMenuProps = {
    generatedMenu: string;
};

const GeneratedMenu: React.FC<GeneratedMenuProps> = ({ generatedMenu }) => {
    const messages = [
        {
            messageTitle: "",
            messageBody: "Generating meal menus that meet your preferences..."
        },
        {
            messageTitle: "",
            messageBody: generatedMenu
        }
    ];

    return (
        <div>
            {messages.map((msg, index) => (
                <AiLines key={index} messageTitle={msg.messageTitle} messageBody={msg.messageBody} />
            ))}
        </div>
    );
};

export default GeneratedMenu;
