"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import SearchWindow from "@/components/global/SearchWindow";
import axios from "axios";

// Categories data
const categories = [
    {
        name: "Walking",
        image: "/workout_category/walking.png",
        image_selected: "/workout_category/walking_selected.png",
    },
    {
        name: "Running",
        image: "/workout_category/running.png",
        image_selected: "/workout_category/running_selected.png",
    },
    {
        name: "Cycling",
        image: "/workout_category/cycling.png",
        image_selected: "/workout_category/cycling_selected.png",
    },
    {
        name: "Gym training",
        image: "/workout_category/gym_training.png",
        image_selected: "/workout_category/gym_training_selected.png",
    },
    {
        name: "Other sports",
        image: "/workout_category/other_sports.png",
        image_selected: "/workout_category/other_sports_selected.png",
    },
];

// Workout item options data
const workoutItemOptions = [
    {
        category: "Walking",
        name: "Walking",
        recordOptions: [
            { unit: "min", kcalPerUnit: 3.5, quantity: 10 },
            { unit: "km", kcalPerUnit: 70, quantity: 1 },
        ],
    },
    {
        category: "Running",
        name: "Running",
        recordOptions: [
            { unit: "min", kcalPerUnit: 7.5, quantity: 10 },
            { unit: "km", kcalPerUnit: 100, quantity: 1 },
        ],
    },
    {
        category: "Cycling",
        name: "Cycling",
        recordOptions: [
            { unit: "min", kcalPerUnit: 4.5, quantity: 10 },
            { unit: "km", kcalPerUnit: 30, quantity: 1 },
        ],
    },
    {
        category: "Gym training",
        name: "Push-ups",
        recordOptions: [
            { unit: "min", kcalPerUnit: 1.6, quantity: 10 },
            { unit: "reps", kcalPerUnit: 0.32, quantity: 10 },
        ],
    },
    {
        category: "Gym training",
        name: "Crunches",
        recordOptions: [
            { unit: "min", kcalPerUnit: 0.8, quantity: 10 },
            { unit: "reps", kcalPerUnit: 0.16, quantity: 10 },
        ],
    },
    {
        category: "Other sports",
        name: "Swimming",
        recordOptions: [
            { unit: "min", kcalPerUnit: 2.4, quantity: 10 },
            { unit: "m", kcalPerUnit: 0.08, quantity: 100 },
        ],
    },
    {
        category: "Other sports",
        name: "Basketball",
        recordOptions: [{ unit: "min", kcalPerUnit: 2.8, quantity: 10 }],
    },
    {
        category: "Other sports",
        name: "Soccer",
        recordOptions: [{ unit: "min", kcalPerUnit: 2.4, quantity: 10 }],
    },
    {
        category: "Other sports",
        name: "Tennis",
        recordOptions: [{ unit: "min", kcalPerUnit: 2.4, quantity: 10 }],
    },
    {
        category: "Other sports",
        name: "Volleyball",
        recordOptions: [{ unit: "min", kcalPerUnit: 1.5, quantity: 10 }],
    },
    {
        category: "Table tennis",
        recordOptions: [{ unit: "min", kcalPerUnit: 1.5, quantity: 10 }],
    },
    {
        category: "Badminton",
        recordOptions: [{ unit: "min", kcalPerUnit: 2.8, quantity: 10 }],
    },
    {
        category: "Baseball",
        recordOptions: [{ unit: "min", kcalPerUnit: 1.0, quantity: 10 }],
    },
];

export default function WorkoutAddingWrapper() {
    const [selectedCategory, setSelectedCategory] = useState<string>("Walking"); // State to track selected category
    const [searchQuery, setSearchQuery] = useState<string>(""); // State to track search query
    const [selectedItem, setSelectedItem] = useState<any>(() => {
        const item = workoutItemOptions.find(
            (option) => option.category === "Walking"
        );
        return item
            ? { ...item, id: uuidv4(), selectedOption: item.recordOptions[0] }
            : null;
    });
    const [draftedItems, setDraftedItems] = useState<any[]>([]); // State to track drafted items
    const router = useRouter(); // Router for navigation

    // Handle category click event
    const handleCategoryClick = (categoryName: string) => {
        setSelectedCategory(categoryName);
        setSearchQuery(""); // Clear search query when a new category is selected

        // Clear selected item when "Gym training" or "Other sports" is selected
        if (
            categoryName === "Gym training" ||
            categoryName === "Other sports"
        ) {
            setSelectedItem(null);
        }

        // Add default item for Walking, Running, and Cycling
        if (
            categoryName === "Walking" ||
            categoryName === "Running" ||
            categoryName === "Cycling"
        ) {
            const item = workoutItemOptions.find(
                (option) => option.category === categoryName
            );
            if (item) {
                setSelectedItem({
                    ...item,
                    id: uuidv4(),
                    selectedOption: item.recordOptions[0],
                });
            }
        }
    };

    // Handle search input change event
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    // Handle item click event
    const handleItemClick = (itemName: string) => {
        const item = workoutItemOptions.find(
            (option) => option.name === itemName
        );
        if (item) {
            setSelectedItem({
                ...item,
                id: uuidv4(),
                selectedOption: item.recordOptions[0],
            });
        }
    };

    // Handle option change event
    const handleOptionChange = (selectedOption: any) => {
        if (selectedItem) {
            setSelectedItem({ ...selectedItem, selectedOption });
        }
    };

    // Handle quantity change event
    const handleQuantityChange = (unit: string, newQuantity: number) => {
        if (selectedItem) {
            const updatedRecordOptions = selectedItem.recordOptions.map(
                (option: any) => {
                    if (option.unit === unit) {
                        return { ...option, quantity: newQuantity };
                    }
                    return option;
                }
            );
            setSelectedItem({
                ...selectedItem,
                recordOptions: updatedRecordOptions,
                selectedOption: {
                    ...selectedItem.selectedOption,
                    quantity: newQuantity,
                },
            });
        }
    };

    // Handle remove drafted item event
    const handleRemoveDraftedItem = (index: number) => {
        const updatedItems = draftedItems.filter((_, i) => i !== index);
        setDraftedItems(updatedItems);
        console.log(selectedItem);
    };

    // Handle add selected item to draft event
    const handleSaveDraftedItems = () => {
        if (selectedItem) {
            setDraftedItems([...draftedItems, selectedItem]);
            setSelectedItem(null); // Clear the selected item after adding to drafts
        }
    };

    const handleSaveItems = async () => {
        console.log(draftedItems);
        const formattedItems: any = [];
        draftedItems.forEach((item) => {
            formattedItems.push({
                name: item.name,
                quantity: item.selectedOption.quantity,
                unit: item.selectedOption.unit,
                calories:
                    item.selectedOption.quantity *
                    item.selectedOption.kcalPerUnit,
            });
        });
        const params = new URLSearchParams(window.location.search);
        const date = params.get("date");
        const [year, month, day] = date.split("-").map(Number);
        const dateObj = new Date(Date.UTC(year, month - 1, day));
        const dataRes = await axios.post("/api/add-workout", {
            params: {
                date: dateObj.toISOString().split("T")[0],
                workouts: formattedItems,
            },
        });
        const data = dataRes.data;
        console.log(data);

        // router.push("/workout");
    };

    return (
        <div className="p-4">
            <h1 className="text-lg font-bold mb-1">Category</h1>
            <div className="flex justify-center mt-4">
                <div className="grid grid-cols-5 gap-0">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryClick(category.name)}
                            className={`relative border border-gray-500 ${
                                selectedCategory === category.name
                                    ? "bg-dark-blue"
                                    : "bg-white"
                            } h-auto`}
                        >
                            <Image
                                src={
                                    selectedCategory === category.name
                                        ? category.image_selected
                                        : category.image
                                }
                                alt={category.name}
                                width={50}
                                height={50}
                                className="block mx-auto p-1"
                            />
                            <span
                                className={`block w-full text-center text-xs font-bold p-1 ${
                                    selectedCategory === category.name
                                        ? "text-white"
                                        : "text-gray-700"
                                }`}
                            >
                                {category.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Display search field when "Gym training" or "Other sports" is selected */}
            {(selectedCategory == "Gym training" ||
                selectedCategory == "Other sports") && (
                <SearchWindow
                    searchQuery={searchQuery}
                    handleSearchChange={handleSearchChange}
                    handleItemClick={handleItemClick}
                    selectedCategory={selectedCategory}
                    workoutItemOptions={workoutItemOptions}
                />
            )}

            {/* Display selected item */}
            {selectedItem && (
                <div className="p-2 border-x border-b border-gray-300 shadow rounded-b-xl">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="font-bold">{selectedItem.name}</h2>
                    </div>
                    {selectedItem.recordOptions.map(
                        (option: any, i: number) => (
                            <div key={i} className="flex items-center mb-2">
                                <input
                                    type="radio"
                                    name={`option-${selectedItem.id}`} // Use item.id for unique name
                                    checked={
                                        option.unit ===
                                        selectedItem.selectedOption.unit
                                    }
                                    onChange={() => handleOptionChange(option)}
                                    className="mr-2"
                                />
                                <span className="mr-2">{option.unit}</span>
                                <input
                                    type="number"
                                    value={option.quantity}
                                    onChange={(e) =>
                                        handleQuantityChange(
                                            option.unit,
                                            parseInt(e.target.value)
                                        )
                                    }
                                    className={`mr-2 p-1 border border-gray-300 rounded w-16 ${
                                        option.unit !==
                                        selectedItem.selectedOption.unit
                                            ? "text-gray-400"
                                            : ""
                                    }`}
                                    disabled={
                                        option.unit !==
                                        selectedItem.selectedOption.unit
                                    }
                                />
                                <span
                                    className={`${
                                        option.unit !==
                                        selectedItem.selectedOption.unit
                                            ? "text-gray-400"
                                            : ""
                                    }`}
                                >
                                    {option.unit}
                                </span>
                                <span
                                    className={`ml-auto ${
                                        option.unit !==
                                        selectedItem.selectedOption.unit
                                            ? "text-gray-400"
                                            : ""
                                    }`}
                                >
                                    {(
                                        option.quantity * option.kcalPerUnit
                                    ).toFixed(0)}{" "}
                                    kcal
                                </span>
                            </div>
                        )
                    )}
                    <div className="flex justify-center mt-2">
                        <button
                            onClick={handleSaveDraftedItems}
                            className={`px-3 py-2 bg-dark-blue text-white ${
                                !selectedItem ? "opacity-30" : ""
                            } rounded`}
                            disabled={!selectedItem}
                        >
                            Add to Draft
                        </button>
                    </div>
                </div>
            )}

            {/* Drafted items */}
            <h1 className="text-lg font-bold mt-4 mb-1">Drafted Workout:</h1>
            <div className="bg-beige rounded-lg shadow border">
                {draftedItems.map((item, index) => (
                    <div
                        key={item.id}
                        className={`flex justify-between p-2 border-gray-300 ${
                            index == draftedItems.length - 1 ? "" : "border-b"
                        }`}
                    >
                        <div className="flex items-center">
                            <span className="mr-2">・</span>
                            <div>
                                <h2 className="font-bold">{item.name}</h2>
                                <h3 className="text-sm text-gray-500">
                                    {item.selectedOption.quantity}{" "}
                                    {item.selectedOption.unit}
                                </h3>
                            </div>
                        </div>
                        <div>
                            <h2 className="font-bold">
                                {(
                                    item.selectedOption.quantity *
                                    item.selectedOption.kcalPerUnit
                                ).toFixed(0)}{" "}
                                kcal
                                <button
                                    onClick={() =>
                                        handleRemoveDraftedItem(index)
                                    }
                                    className="text-red-500 text-2xl ml-2"
                                >
                                    ×
                                </button>
                            </h2>
                        </div>
                    </div>
                ))}
            </div>

            {selectedCategory && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleSaveItems}
                        className={`px-3 py-2 bg-dark-blue text-white ${
                            draftedItems.length === 0 ? "opacity-30" : ""
                        } rounded`}
                        disabled={draftedItems.length === 0}
                    >
                        Save Workout
                    </button>
                </div>
            )}
        </div>
    );
}
