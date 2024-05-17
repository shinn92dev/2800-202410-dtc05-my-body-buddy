import { ChangeEvent, useState } from "react";
import Image from "next/image";
import magnifyingGlassIcon from "@/public/magnifying_glass.svg";

interface SearchFieldProps {
    searchQuery: string;
    handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleItemClick: (itemName: string) => void;
    selectedCategory: string;
    workoutItemOptions: any[];
}

export default function SearchWindow({
                                        searchQuery,
                                        handleSearchChange,
                                        handleItemClick,
                                        selectedCategory,
                                        workoutItemOptions
                                    }: SearchFieldProps) {
    const [searchFocused, setSearchFocused] = useState<boolean>(false);

    const filteredItems = workoutItemOptions.filter(item =>
        item.category === selectedCategory && item.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
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
    );
}
