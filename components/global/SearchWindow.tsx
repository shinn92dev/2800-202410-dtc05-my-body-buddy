"use client";

import { useState, ChangeEvent, FocusEvent } from "react";
import Image from "next/image";
import magnifyingGlassIcon from "@/public/magnifying_glass.svg"; // Import magnifying glass icon

type SearchWindowProps = {
    searchQuery: string;
    handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleItemClick: (itemName: string) => void;
    selectedCategory: string;
    workoutItemOptions: any[];
};

// SearchWindow component
export default function SearchWindow({
                                         searchQuery,
                                         handleSearchChange,
                                         handleItemClick,
                                         selectedCategory,
                                         workoutItemOptions
                                     }: SearchWindowProps) {
    const [isFocused, setIsFocused] = useState(false); // Add state to manage focus

    // Filter items based on search query and selected category
    const filteredItems = workoutItemOptions.filter(item =>
        item.category === selectedCategory && item.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handlers to set focus state
    const handleFocus = () => setIsFocused(true);
    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        // Delay setting focus state to allow click event to register
        setTimeout(() => {
            if (event.currentTarget && document.activeElement && !event.currentTarget.contains(document.activeElement)) {
                setIsFocused(false);
            }
        }, 100);
    };

    const handleItemSelect = (itemName: string) => {
        handleItemClick(itemName);
        setIsFocused(false); // Hide the list on item click
    };

    return (
        <div className="relative mt-4">
            <input
                type="text"
                placeholder="Enter item to add"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleFocus} // Set focus state on focus
                onBlur={handleBlur} // Set focus state on blur
                className="w-full p-2 border border-gray-300 rounded pl-10"
            />
            <Image src={magnifyingGlassIcon} alt="Search" className="absolute left-3 top-2.5 w-5 h-5" />
            {isFocused && filteredItems.length > 0 && (
                <ul className="absolute w-full border border-gray-300 rounded bg-white z-10">
                    {filteredItems.map((item, index) => (
                        item.name && (
                            <li
                                key={index}
                                onClick={() => handleItemSelect(item.name)} // Use handleItemSelect here
                                className="p-2 hover:bg-gray-100 cursor-pointer border-t"
                            >
                                {item.name}
                            </li>
                        )
                    ))}
                </ul>
            )}
        </div>
    );
}
