"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import magnifyingGlassIcon from "@/public/magnifying_glass.svg";

const categories = [
    { name: "Walking", image: "/workout_category/walking.png", image_selected: "/workout_category/walking_selected.png" },
    { name: "Running", image: "/workout_category/running.png", image_selected: "/workout_category/running_selected.png" },
    { name: "Cycling", image: "/workout_category/cycling.png", image_selected: "/workout_category/cycling_selected.png" },
    { name: "Gym training", image: "/workout_category/gym_training.png", image_selected: "/workout_category/gym_training_selected.png" },
    { name: "Other sports", image: "/workout_category/other_sports.png", image_selected: "/workout_category/other_sports_selected.png" }
];

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
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [searchFocused, setSearchFocused] = useState<boolean>(false);
    const router = useRouter();

    const handleCategoryClick = (categoryName: string) => {
        setSelectedCategory(categoryName);
        setSearchQuery(""); // Clear search query when a new category is selected

        // Add default item for Walking, Running, and Cycling
        if (categoryName === "Walking" || categoryName === "Running" || categoryName === "Cycling") {
            const item = workoutItemOptions.find(option => option.category === categoryName);
            if (item) {
                setSelectedItems([...selectedItems, { ...item, selectedOption: item.recordOptions[0], quantity: 10 }]);
            }
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleItemClick = (itemName: string) => {
        const item = workoutItemOptions.find(option => option.name === itemName);
        if (item) {
            setSelectedItems([...selectedItems, { ...item, selectedOption: item.recordOptions[0], quantity: 10 }]);
        }
    };

    const handleOptionChange = (index: number, selectedOption: any) => {
        const updatedItems = [...selectedItems];
        updatedItems[index].selectedOption = selectedOption;
        setSelectedItems(updatedItems);
    };

    const handleQuantityChange = (index: number, optionIndex: number, newQuantity: number) => {
        const updatedItems = [...selectedItems];
        updatedItems[index].recordOptions[optionIndex].quantity = newQuantity;
        setSelectedItems(updatedItems);
    };

    const handleRemoveItem = (index: number) => {
        const updatedItems = selectedItems.filter((_, i) => i !== index);
        setSelectedItems(updatedItems);
    };

    const handleAddSelectedItems = () => {
        router.push("/workout");
    };

    const filteredItems = workoutItemOptions.filter(item =>
        item.category === selectedCategory && item.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4">
            <h1 className="text-lg font-bold mb-1">Category</h1>
            <div className="flex justify-center mb-4">
                <div className="grid grid-cols-5 gap-0">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryClick(category.name)}
                            className={`relative border border-gray-500 ${selectedCategory === category.name ? "bg-gray-500" : "bg-white"} h-auto`}
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
                <div className="mb-4 relative">
                    <input
                        type="text"
                        placeholder="Enter item to add"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setTimeout(() => setSearchFocused(false), 100)} // setTimeoutでblurイベントを遅らせる
                        className="w-full p-2 border border-gray-300 rounded pl-10"
                    />
                    <Image src={magnifyingGlassIcon} alt="Search" className="absolute left-3 top-2.5 w-5 h-5"/>
                    {searchFocused && filteredItems.length > 0 && (
                        <ul className="absolute w-full border border-gray-300 rounded bg-white z-10">
                            {filteredItems.map((item, index) => (
                                item.name && (
                                    <li
                                        key={index}
                                        onClick={() => handleItemClick(item.name)}
                                        className="p-2 hover:bg-gray-100 cursor-pointer border-t"
                                    >
                                        {item.name}
                                    </li>
                                )
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* Display selected items */}
            {selectedItems.map((item, index) => (
                <div key={index} className="p-2 border-y border-gray-300">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="font-bold">{item.name}</h2>
                        <button onClick={() => handleRemoveItem(index)} className="text-red-500 text-2xl">×</button>
                    </div>
                    {item.recordOptions.map((option: any, i: number) => (
                        <div key={i} className="flex items-center mb-2">
                            <input
                                type="radio"
                                name={`option-${index}`}
                                checked={option.unit === item.selectedOption.unit}
                                onChange={() => handleOptionChange(index, option)}
                                className="mr-2"
                            />
                            <span className="mr-2">{option.unit}</span>
                            <input
                                type="number"
                                value={option.quantity ?? 10}
                                onChange={(e) => handleQuantityChange(index, i, parseInt(e.target.value))}
                                className={`mr-2 p-1 border border-gray-300 rounded w-16 ${option.unit !== item.selectedOption.unit ? "text-gray-400" : ""}`}
                                disabled={option.unit !== item.selectedOption.unit}
                            />
                            <span className={`${option.unit !== item.selectedOption.unit ? "text-gray-400" : ""}`}>{option.unit}</span>
                            <span className={`ml-auto ${option.unit !== item.selectedOption.unit ? "text-gray-400" : ""}`}>{((option.quantity ?? 10) * option.kcalPerUnit).toFixed(1)} kcal</span>
                        </div>
                    ))}
                </div>
            ))}

            {selectedCategory && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleAddSelectedItems}
                        className={`px-4 py-2 ${selectedItems.length === 0 ? "bg-gray-500 text-white opacity-30" : "bg-gray-500 text-white"} rounded`}
                        disabled={selectedItems.length === 0}
                    >
                        Add Selected Items
                    </button>
                </div>
            )}
        </div>
    );
}
