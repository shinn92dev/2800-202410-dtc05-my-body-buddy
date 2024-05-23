"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import SearchWindow from "@/components/global/SearchWindow";

// Categories data
const categories = [
    { name: "Walking", image: "/workout_category/walking.png", image_selected: "/workout_category/walking_selected.png" },
    { name: "Running", image: "/workout_category/running.png", image_selected: "/workout_category/running_selected.png" },
    { name: "Cycling", image: "/workout_category/cycling.png", image_selected: "/workout_category/cycling_selected.png" },
    { name: "Gym training", image: "/workout_category/gym_training.png", image_selected: "/workout_category/gym_training_selected.png" },
    { name: "Other sports", image: "/workout_category/other_sports.png", image_selected: "/workout_category/other_sports_selected.png" }
];

// Workout item options data
const workoutItemOptions = [
    { category: "Walking", name: "Walking", recordOptions: [{ unit: "min", kcalPerUnit: 3.5 }, { unit: "km", kcalPerUnit: 70 }] },
    { category: "Running", name: "Running", recordOptions: [{ unit: "min", kcalPerUnit: 7.5 }, { unit: "km", kcalPerUnit: 100 }] },
    { category: "Cycling", name: "Cycling", recordOptions: [{ unit: "min", kcalPerUnit: 4.5 }, { unit: "km", kcalPerUnit: 30 }] },
    { category: "Gym training", name: "Push-ups", recordOptions: [{ unit: "min", kcalPerUnit: 1.6 }, { unit: "reps", kcalPerUnit: 0.32 }] },
    { category: "Gym training", name: "Crunches", recordOptions: [{ unit: "min", kcalPerUnit: 0.8 }, { unit: "reps", kcalPerUnit: 0.16 }] },
    { category: "Other sports", name: "Swimming", recordOptions: [{ unit: "min", kcalPerUnit: 2.4 }, { unit: "m", kcalPerUnit: 0.08 }] },
    { category: "Other sports", name: "Basketball", recordOptions: [{ unit: "min", kcalPerUnit: 2.8 }] },
    { category: "Other sports", name: "Soccer", recordOptions: [{ unit: "min", kcalPerUnit: 2.4 }] },
    { category: "Other sports", name: "Tennis", recordOptions: [{ unit: "min", kcalPerUnit: 2.4 }] },
    { category: "Other sports", name: "Volleyball", recordOptions: [{ unit: "min", kcalPerUnit: 1.5 }] },
    { category: "Table tennis", recordOptions: [{ unit: "min", kcalPerUnit: 1.5 }] },
    { category: "Badminton", recordOptions: [{ unit: "min", kcalPerUnit: 2.8 }] },
    { category: "Baseball", recordOptions: [{ unit: "min", kcalPerUnit: 1.0 }] }
];

export default function WorkoutAddingWrapper() {
    const [selectedCategory, setSelectedCategory] = useState<string>(""); // State to track selected category
    const [searchQuery, setSearchQuery] = useState<string>(""); // State to track search query
    const [selectedItems, setSelectedItems] = useState<any[]>([]); // State to track selected items
    const router = useRouter(); // Router for navigation

    // Handle category click event
    const handleCategoryClick = (categoryName: string) => {
        setSelectedCategory(categoryName);
        setSearchQuery(""); // Clear search query when a new category is selected

        // Add default item for Walking, Running, and Cycling
        if (categoryName === "Walking" || categoryName === "Running" || categoryName === "Cycling") {
            const item = workoutItemOptions.find(option => option.category === categoryName);
            if (item) {
                setSelectedItems([...selectedItems, { ...item, id: uuidv4(), selectedOption: { ...item.recordOptions[0], quantity: 10 } }]);
            }
        }
    };

    // Handle search input change event
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    // Handle item click event
    const handleItemClick = (itemName: string) => {
        const item = workoutItemOptions.find(option => option.name === itemName);
        if (item) {
            setSelectedItems([...selectedItems, { ...item, id: uuidv4(), selectedOption: { ...item.recordOptions[0], quantity: 10 } }]);
        }
    };

    // Handle option change event
    const handleOptionChange = (index: number, selectedOption: any) => {
        const updatedItems = [...selectedItems];
        updatedItems[index].selectedOption = { ...selectedOption, quantity: updatedItems[index].selectedOption.quantity };
        setSelectedItems(updatedItems);
    };

    // Handle quantity change event
    const handleQuantityChange = (index: number, newQuantity: number) => {
        const updatedItems = [...selectedItems];
        updatedItems[index].selectedOption.quantity = newQuantity;
        setSelectedItems(updatedItems);
    };

    // Handle remove item event
    const handleRemoveItem = (index: number) => {
        const updatedItems = selectedItems.filter((_, i) => i !== index);
        setSelectedItems(updatedItems);
    };

    // Handle add selected items event
    const handleAddSelectedItems = () => {
        router.push("/workout");
    };

    return (
        <div className="p-4">
            <h1 className="text-lg font-bold mb-1">Category</h1>
            <div className="flex justify-center mb-4">
                <div className="grid grid-cols-5 gap-0">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryClick(category.name)}
                            className={`relative border border-gray-500 ${selectedCategory === category.name ? "bg-dark-blue" : "bg-white"} h-auto`}
                        >
                            <Image
                                src={selectedCategory === category.name ? category.image_selected : category.image}
                                alt={category.name}
                                width={50}
                                height={50}
                                className="block mx-auto p-1"
                            />
                            <span className={`block w-full text-center text-xs font-bold ${selectedCategory === category.name ? "text-white" : "text-gray-700"}`}>
                                {category.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Display search field when "Gym training" or "Other sports" is selected */}
            {(selectedCategory == "Gym training" || selectedCategory == "Other sports") && (
                <SearchWindow
                    searchQuery={searchQuery}
                    handleSearchChange={handleSearchChange}
                    handleItemClick={handleItemClick}
                    selectedCategory={selectedCategory}
                    workoutItemOptions={workoutItemOptions}
                />
            )}

            {/* Display selected items */}
            {selectedItems.map((item, index) => (
                <div key={item.id} className="p-2 border-y border-gray-300">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="font-bold">{item.name}</h2>
                        <button onClick={() => handleRemoveItem(index)} className="text-red-500 text-2xl">×</button>
                    </div>
                    {item.recordOptions.map((option: any, i: number) => (
                        <div key={i} className="flex items-center mb-2">
                            <input
                                type="radio"
                                name={`option-${item.id}`} // Use item.id for unique name
                                checked={option.unit === item.selectedOption.unit}
                                onChange={() => handleOptionChange(index, option)}
                                className="mr-2"
                            />
                            <span className="mr-2">{option.unit}</span>
                            <input
                                type="number"
                                value={item.selectedOption.unit === option.unit ? item.selectedOption.quantity : 10}
                                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                className={`mr-2 p-1 border border-gray-300 rounded w-16 ${option.unit !== item.selectedOption.unit ? "text-gray-400" : ""}`}
                                disabled={option.unit !== item.selectedOption.unit}
                            />
                            <span className={`${option.unit !== item.selectedOption.unit ? "text-gray-400" : ""}`}>{option.unit}</span>
                            <span className={`ml-auto ${option.unit !== item.selectedOption.unit ? "text-gray-400" : ""}`}>{(item.selectedOption.quantity * option.kcalPerUnit).toFixed(1)} kcal</span>
                        </div>
                    ))}
                </div>
            ))}

            {selectedCategory && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleAddSelectedItems}
                        className={`px-4 py-2 bg-dark-blue text-white ${selectedItems.length === 0 ? "opacity-30" : ""} rounded`}
                        disabled={selectedItems.length === 0}
                    >
                        Add Selected Items
                    </button>
                </div>
            )}
        </div>
    );
}
