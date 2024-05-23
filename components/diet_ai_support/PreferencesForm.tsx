import React, { useState } from 'react';
import TagsWithAddingField from '@/components/global/TagsWithAddingField'; // Import the TagsWithAddingField component

type PreferencesFormProps = {
    onSubmit: (preferences: any) => void;
};

type Ingredient = {
    name: string;
    quantity?: string;
};

const defaultPreferences = [
    'Halal', 'Vegetarian', 'No cooking required',
    'Something I haven’t eaten recently', 'Easy to prepare', 'Minimal washing up'
];

const PreferencesForm: React.FC<PreferencesFormProps> = ({ onSubmit }) => {
    const [servings, setServings] = useState<string>('1');
    const [customServings, setCustomServings] = useState<string>('5');
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [currentIngredient, setCurrentIngredient] = useState<string>('');
    const [currentQuantity, setCurrentQuantity] = useState<string>('');
    const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
    const [customServingsError, setCustomServingsError] = useState<string>('');
    const [isCustomSelected, setIsCustomSelected] = useState<boolean>(false);

    const handleAddIngredient = () => {
        if (currentIngredient) {
            const newIngredient: Ingredient = { name: currentIngredient };
            if (currentQuantity) newIngredient.quantity = currentQuantity;
            setIngredients([...ingredients, newIngredient]);
            setCurrentIngredient('');
            setCurrentQuantity('');
        }
    };

    const handleCustomServingsChange = (value: string) => {
        setCustomServings(value);
        if (/^\d+$/.test(value) && parseInt(value) > 0) {
            setServings(value);
            setCustomServingsError('');
        } else {
            setCustomServingsError('Please enter a positive integer');
        }
    };

    const handleTogglePreference = (preference: string) => {
        setSelectedPreferences(prev =>
            prev.includes(preference)
                ? prev.filter(p => p !== preference)
                : [...prev, preference]
        );
    };

    const handleSubmit = () => {
        const newIngredients = [...ingredients];
        if (currentIngredient) {
            const newIngredient: Ingredient = { name: currentIngredient };
            if (currentQuantity) newIngredient.quantity = currentQuantity;
            newIngredients.push(newIngredient);
        }
        onSubmit({
            servings,
            ingredients: newIngredients,
            preferences: selectedPreferences,
        });
    };

    return (
        <div className="p-4 rounded-lg w-full max-w-lg mt-2" style={{background: '#d2fdff'}}>
            <div className="mb-4">
                <h2 className="text-lg font-bold py-1 mt-1">How Many Servings?</h2>
                <div className="mb-2">
                    <label className="block">
                        <input
                            type="radio"
                            value="1"
                            checked={servings === '1' && !isCustomSelected}
                            onChange={() => {
                                setServings('1');
                                setCustomServings('5');
                                setCustomServingsError('');
                                setIsCustomSelected(false);
                            }}
                            className="mr-2"
                        />
                        1 (Just for today)
                    </label>
                    <label className="block">
                        <input
                            type="radio"
                            value="7"
                            checked={servings === '7' && !isCustomSelected}
                            onChange={() => {
                                setServings('7');
                                setCustomServings('5');
                                setCustomServingsError('');
                                setIsCustomSelected(false);
                            }}
                            className="mr-2"
                        />
                        7 (for a week)
                    </label>
                    <label className="block">
                        <input
                            type="radio"
                            value="custom"
                            checked={isCustomSelected}
                            onChange={() => {
                                setServings(customServings);
                                setCustomServingsError('');
                                setIsCustomSelected(true);
                            }}
                            className="mr-2"
                        />
                        Custom: <input
                        type="text"
                        className={`border ml-2 p-1 ${isCustomSelected ? '' : 'bg-gray-200'}`}
                        value={customServings}
                        onChange={(e) => handleCustomServingsChange(e.target.value)}
                        disabled={!isCustomSelected}
                    />
                    </label>
                    {customServingsError && <p className="text-red-500">{customServingsError}</p>}
                </div>
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-bold border-t py-1 mt-1">Ingredients to Include:</h2>
                <div className="flex mb-2">
                    <input
                        type="text"
                        placeholder="Ingredient name"
                        value={currentIngredient}
                        onChange={(e) => setCurrentIngredient(e.target.value)}
                        className="border p-2 flex-grow mr-2 w-32"
                    />
                    <input
                        type="text"
                        placeholder="Quantity"
                        value={currentQuantity}
                        onChange={(e) => setCurrentQuantity(e.target.value)}
                        className="border p-2 flex-grow mr-2 w-24"
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
                        <h2 key={index} className="flex justify-between font-bold">
                            ・{ingredient.name} - {ingredient.quantity ? ingredient.quantity : ''}
                        </h2>
                    ))}
                </ul>
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-bold border-t py-1 mt-1">Other Preferences:</h2>
                <TagsWithAddingField
                    defaultTags={defaultPreferences}
                    inputFieldPlaceHolder="Add other preference"
                    selectedTags={selectedPreferences}
                    onToggleTag={handleTogglePreference}
                />
            </div>
            <div className="flex justify-center border-t pt-2">
                <button
                    onClick={handleSubmit}
                    className={`px-4 py-2 bg-dark-blue text-white rounded-full ${customServingsError ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!!customServingsError}
                >
                    Generate Menu
                </button>
            </div>
        </div>
    );
};

export default PreferencesForm;
