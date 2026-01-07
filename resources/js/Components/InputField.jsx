export default function InputField({
    label,
    type = "text",
    value,
    onChange,
    error,
    placeholder,
}) {
    const handleChange = (e) => {
        let val = e.target.value;
        const lowerLabel = label.toLowerCase();

        if (lowerLabel.includes("telepon")) {
            val = val.replace(/(?!^\+)[^0-9]/g, "");
            onChange({ target: { value: val } });
        } else if (lowerLabel.includes("nama")) {
            val = val.replace(/[^a-zA-Z\s\.,]/g, "");
            onChange({ target: { value: val } });
        } else {
            onChange(e);
        }
    };

    return (
        <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                {label}
            </label>
            <input
                type={type === "number" ? "text" : type}
                value={value || ""}
                onChange={handleChange}
                placeholder={placeholder}
                className={`w-full p-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 font-semibold text-sm transition-all ${
                    error ? "border-red-500 bg-red-50" : "bg-white"
                }`}
            />
            {error && (
                <div className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-tighter">
                    {error}
                </div>
            )}
        </div>
    );
}
