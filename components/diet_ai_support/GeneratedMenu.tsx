import React from 'react';
import AiLines from '@/components/global/AiLines';

const GeneratedMenu: React.FC = () => {
    const messages = [
        {
            messageTitle: "Generating meal menus that meet your preferences...",
            messageBody: ""
        },
        {
            messageTitle: "",
            messageBody: "Here's a simple meal plan that uses the specified ingredients and aims to meet the nutrient targets. This meal plan includes two dishes—a main dish and a side salad.\n\n1. Pan-Fried Pork Belly with Cabbage\nIngredients:\n• Pork belly\n• Cabbage\n• Soy sauce\n• Garlic\n• Ginger\n\n2. Mixed Green Salad\nIngredients:\n• Lettuce\n• Cucumber\n• Carrot\n• Olive oil\n• Lemon juice"
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
