import React, { useState } from 'react';

type PreferencesFormProps = {
    onSubmit: (preferences: any) => void;
};

type Ingredient = {
    name: string;
    quantity?: string;
};

const PreferencesForm: React.FC<PreferencesFormProps> = ({ onSubmit }) => {
    const [servings, setServings] = useState<string>('1');
    const [customServings, setCustomServings] = useState<string>('');
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [currentIngredient, setCurrentIngredient] = useState<string>('');
    const [currentQuantity, setCurrentQuantity] = useState<string>('');
    const [preferences, setPreferences] = useState<string[]>([
        'Halal', 'Vegetarian', 'No cooking required',
        'Something I haven’t eaten recently', 'Easy to prepare', 'Minimal washing up'
    ]);
    const [currentPreference, setCurrentPreference] = useState<string>('');

    const handleAddIngredient = () => {
        if (currentIngredient) {
            const newIngredient: Ingredient = { name: currentIngredient };
            if (currentQuantity) newIngredient.quantity = currentQuantity;
            setIngredients([...ingredients, newIngredient]);
            setCurrentIngredient('');
            setCurrentQuantity('');
        }
    };

    const handleAddPreference = () => {
        if (currentPreference && !preferences.includes(currentPreference)) {
            setPreferences([...preferences, currentPreference]);
            setCurrentPreference('');
        }
    };

    const handleRemovePreference = (preference: string) => {
        setPreferences(preferences.filter(p => p !== preference));
    };

    const handleSubmit = () => {
        const newIngredients = [...ingredients];
        if (currentIngredient) {
            const newIngredient: Ingredient = { name: currentIngredient };
            if (currentQuantity) newIngredient.quantity = currentQuantity;
            newIngredients.push(newIngredient);
        }
        onSubmit({
            servings: servings === 'custom' ? customServings : servings,
            ingredients: newIngredients,
            preferences,
        });
    };

    return (
        <div className="p-4 border rounded-lg w-full max-w-lg">
            <div className="mb-4">
                <label className="block mb-2 font-bold">How many servings?</label>
                <div className="mb-2">
                    <label className="block">
                        <input
                            type="radio"
                            value="1"
                            checked={servings === '1'}
                            onChange={() => setServings('1')}
                            className="mr-2"
                        />
                        1 (Just for today)
                    </label>
                    <label className="block">
                        <input
                            type="radio"
                            value="7"
                            checked={servings === '7'}
                            onChange={() => setServings('7')}
                            className="mr-2"
                        />
                        7 (for a week)
                    </label>
                    <label className="block">
                        <input
                            type="radio"
                            value="custom"
                            checked={servings === 'custom'}
                            onChange={() => setServings('custom')}
                            className="mr-2"
                        />
                        Custom: <input type="text" className="border ml-2 p-1" value={customServings} onClick={() => setServings('custom')} onChange={(e) => setCustomServings(e.target.value)} />
                    </label>
                </div>
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-bold">Ingredients to include</label>
                <div className="flex mb-2">
                    <input
                        type="text"
                        placeholder="Enter ingredient"
                        value={currentIngredient}
                        onChange={(e) => setCurrentIngredient(e.target.value)}
                        className="border p-2 flex-grow mr-2"
                    />
                    <input
                        type="text"
                        placeholder="Enter quantity (optional)"
                        value={currentQuantity}
                        onChange={(e) => setCurrentQuantity(e.target.value)}
                        className="border p-2 flex-grow mr-2"
                    />
                    <button
                        onClick={handleAddIngredient}
                        className="bg-dark-blue text-white p-2 rounded"
                    >
                        +
                    </button>
                </div>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index} className="flex justify-between">
                            {ingredient.name} {ingredient.quantity ? ingredient.quantity : ''}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-bold">Other Preferences</label>
                <div className="flex flex-wrap mb-2 gap-2 overflow-x-auto max-w-full">
                    {preferences.map((preference, index) => (
                        <div key={index} className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                            <span>{preference}</span>
                            <button
                                onClick={() => handleRemovePreference(preference)}
                                className="ml-2 text-red-500"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex mb-2">
                    <input
                        type="text"
                        placeholder="Add other preference"
                        value={currentPreference}
                        onChange={(e) => setCurrentPreference(e.target.value)}
                        className="border p-2 flex-grow mr-2"
                    />
                    <button
                        onClick={handleAddPreference}
                        className="bg-dark-blue text-white p-2 rounded"
                    >
                        Add
                    </button>
                </div>
            </div>
            <button
                onClick={handleSubmit}
                className="bg-orange text-white p-2 rounded w-full"
            >
                Generate Menu
            </button>
        </div>
    );
};

export default PreferencesForm;
