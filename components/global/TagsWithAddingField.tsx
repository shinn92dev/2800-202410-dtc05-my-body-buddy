"use client";

import { useState } from "react";

type TagsWithAddingFieldProps = {
    defaultTags: string[];
    inputFieldPlaceHolder: string;
    selectedTags: string[];
    onToggleTag: (tag: string) => void;
};

export default function TagsWithAddingField({ defaultTags, inputFieldPlaceHolder, selectedTags, onToggleTag }: TagsWithAddingFieldProps) {
    const [tags, setTags] = useState(defaultTags);
    const [newTag, setNewTag] = useState("");

    const addTag = () => {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            onToggleTag(newTag);
            setNewTag("");
        }
    };

    return (
        <div className="p-4">
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                    <button
                        key={index}
                        onClick={() => onToggleTag(tag)}
                        className={`px-2 py-1 rounded border ${
                            selectedTags.includes(tag)
                                ? "bg-dark-blue text-white"
                                : "bg-white text-gray-700"
                        }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder={inputFieldPlaceHolder}
                    className="flex-1 px-2 py-1 border rounded"
                />
                <button
                    onClick={addTag}
                    className="px-4 py-1 bg-dark-blue text-white rounded"
                >
                    Add
                </button>
            </div>
        </div>
    );
}
