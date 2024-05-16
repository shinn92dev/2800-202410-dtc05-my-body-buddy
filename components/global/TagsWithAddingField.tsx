"use client";

import { useState } from "react";

type TagsWithAddingFieldProps = {
    defaultTags: string[];
    inputFieldPlaceHolder: string;
};

export default function TagsWithAddingField({defaultTags, inputFieldPlaceHolder}: TagsWithAddingFieldProps) {
    const [tags, setTags] = useState(defaultTags);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState("");

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const addTag = () => {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setSelectedTags([...selectedTags, newTag]);
            setNewTag("");
        }
    };

    return (
        <div className="p-4">
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                    <button
                        key={index}
                        onClick={() => toggleTag(tag)}
                        className={`px-2 py-1 rounded border ${
                            selectedTags.includes(tag)
                                ? "bg-gray-500 text-white"
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
                    className="px-4 py-1 bg-gray-500 text-white rounded"
                >
                    Add
                </button>
            </div>
        </div>
    );
}
