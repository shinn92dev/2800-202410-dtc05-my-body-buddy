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
        <div className="p-4 border rounded-lg mb-4 bg-beige">
            <h2 className="text-lg font-bold py-1 mt-1">Number of Servings</h2>
            <p>• {preferences.servings} {preferences.servings === '1' ? '(Just for today)' : preferences.servings === '7' ? '(for a week)' : ''}</p>
            <h2 className="text-lg font-bold border-t py-1 mt-1">Ingredients to Include:</h2>
            <ul>
                {preferences.ingredients.map((ingredient, index) => (
                    <p key={index}>
                        ・{ingredient.name} - {ingredient.quantity}
                    </p>
                ))}
            </ul>
            <h2 className="text-lg font-bold border-t py-1 mt-1">Other Preferences:</h2>
            <div className="flex flex-wrap gap-2 mb-2">
                <div>
                    {preferences.preferences.map((preference, index) => (
                        <p key={index}>
                            ・{preference}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PreferencesSummary;
