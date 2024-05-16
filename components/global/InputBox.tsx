export default function InputBox({
    labelText,
    id,
    hidden,
    type,
    placeholder,
    isTop,
}: {
    labelText: string;
    id: string;
    hidden: boolean;
    type: string;
    placeholder: string;
    isTop: boolean;
}) {
    return (
        <div className={isTop ? "" : "mt-2"}>
            <label htmlFor={id} className={hidden ? "hidden" : ""}>
                {labelText}
            </label>
            <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type={type}
                placeholder={placeholder}
                id={id}
            />
        </div>
    );
}
