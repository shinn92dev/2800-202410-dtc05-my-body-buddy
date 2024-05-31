import React, { useState } from 'react';
import TagsWithAddingField from '@/components/global/TagsWithAddingField'; // Import the TagsWithAddingField component
import { toast, Toaster } from 'react-hot-toast';

type PreferencesFormProps = {
    onSubmit: (preferences: any) => void;
};

type Ingredient = {
    name: string;
    quantity?: string;
};

const defaultPreferences = [
    'Halal', 'Vegetarian', 'No cooking required',
    'Easy to prepare', 'Minimal washing up', 'Low-carb', 'Tasty', 'Low sodium', 'Healthy'
];

const PreferencesForm: React.FC<PreferencesFormProps> = ({ onSubmit }) => {
    const maxQuantityLength = 13; // inclusive
    const minQuantityLength = 1; // inclusive
    const maxNameLength = 25; // inclusive
    const minNameLength = 1; // inclusive
    const maxPreferenceLength = 42; // inclusive
    const minPreferenceLength = 1; // inclusive
    const maxCustomServings = 30; // inclusive
    const minCustomServings = 0.01; // inclusive
    const maxNumberOfChosenPreferences = 10; // inclusive

    const [servings, setServings] = useState<string>('1');
    const [customServings, setCustomServings] = useState<string>('5');
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [currentIngredient, setCurrentIngredient] = useState<string>('');
    const [currentQuantity, setCurrentQuantity] = useState<string>('');
    const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
    const [customServingsError, setCustomServingsError] = useState<string>('');
    const [isCustomSelected, setIsCustomSelected] = useState<boolean>(false);

    const showToast = (message: string) => {
        toast.error(message);
    };

    const handleAddIngredient = () => {
        if (currentIngredient.length < minNameLength || currentIngredient.length > maxNameLength) {
            showToast(`Ingredient name must be between ${minNameLength} and ${maxNameLength} characters.`);
            return;
        }
        if (currentQuantity.length < minQuantityLength || currentQuantity.length > maxQuantityLength) {
            showToast(`Quantity must be between ${minQuantityLength} and ${maxQuantityLength} characters.`);
            return;
        }
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
    };

    const handleTogglePreference = (preference: string) => {
        if (selectedPreferences.includes(preference)) {
            setSelectedPreferences(prev => prev.filter(p => p !== preference));
        } else if (selectedPreferences.length < maxNumberOfChosenPreferences) {
            setSelectedPreferences(prev => [...prev, preference]);
        } else {
            showToast(`You can select up to ${maxNumberOfChosenPreferences} preferences.`);
        }
    };

    const validateInputs = () => {
        let valid = true;

        const numValue = parseFloat(customServings);
        if (isNaN(numValue) || numValue < minCustomServings || numValue > maxCustomServings) {
            showToast(`Please enter a number between ${minCustomServings} and ${maxCustomServings}`);
            valid = false;
        }

        if (selectedPreferences.length > maxNumberOfChosenPreferences) {
            showToast(`You can select up to ${maxNumberOfChosenPreferences} preferences.`);
            valid = false;
        }

        return valid;
    };

    const handleSubmit = () => {
        if (!validateInputs()) {
            return;
        }

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
        <div className="p-4 rounded-lg w-full max-w-lg mt-2 bg-beige">
            <Toaster />
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
                        maxLength={maxNameLength}
                    />
                    <input
                        type="text"
                        placeholder="Quantity"
                        value={currentQuantity}
                        onChange={(e) => setCurrentQuantity(e.target.value)}
                        className="border p-2 flex-grow mr-2 w-24"
                        maxLength={maxQuantityLength}
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
