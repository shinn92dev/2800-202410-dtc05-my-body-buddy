import { RefObject } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputBoxProps {
    labelText: string;
    id: string;
    hidden: boolean;
    type: string;
    placeholder: string;
    isTop: boolean;
}

export default function InputBox({
    labelText,
    id,
    hidden,
    type,
    placeholder,
    isTop,
    onChangeFn,
}: InputBoxProps) {
    return (
        <div className={isTop ? "" : "mt-2"}>
            <label htmlFor={id} className={hidden ? "hidden" : ""}>
                {labelText}
            </label>
            <input
                className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type={type}
                placeholder={placeholder}
                id={id}
                name={id}
                onChange={onChangeFn}
            />
        </div>
    );
}
