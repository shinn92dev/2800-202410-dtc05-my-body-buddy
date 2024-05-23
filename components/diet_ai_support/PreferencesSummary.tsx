import React from 'react';

type PreferencesSummaryProps = {
    preferences: {
        servings: string;
        ingredients: { name: string; quantity: string }[];
        preferences: string[];
    };
};

const PreferencesSummary: React.FC<PreferencesSummaryProps> = ({ preferences }) => {
    return (
        <div className="p-4 border rounded-lg mb-4">
            <h2 className="font-bold mb-2">Number of servings</h2>
            <p>• {preferences.servings} {preferences.servings === '1' ? '(Just for today)' : preferences.servings === '7' ? '(for a week)' : ''}</p>
            <h2 className="font-bold mt-4 mb-2">Ingredients to include</h2>
            <ul>
                {preferences.ingredients.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient.name} {ingredient.quantity}
                    </li>
                ))}
            </ul>
            <h2 className="font-bold mt-4 mb-2">Other Preferences</h2>
            <ul>
                {preferences.preferences.map((preference, index) => (
                    <li key={index}>
                        {preference}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PreferencesSummary;
