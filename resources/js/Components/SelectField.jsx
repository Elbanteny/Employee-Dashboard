export default function SelectField({
    label,
    value,
    onChange,
    options = [],
    error,
}) {
    return (
        <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                {label}
            </label>
            <select
                value={value || ""}
                onChange={onChange}
                className={`w-full p-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 font-semibold text-sm transition-all ${
                    error ? "border-red-500 bg-red-50" : "bg-white"
                }`}
            >
                <option value="">Pilih {label}</option>
                {options?.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                        {opt.name}
                    </option>
                ))}
            </select>
            {error && (
                <div className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-tighter">
                    {error}
                </div>
            )}
        </div>
    );
}
