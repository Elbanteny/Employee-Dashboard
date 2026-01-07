import { router } from "@inertiajs/react";
import { useState, useCallback } from "react";
import debounce from "lodash/debounce";

export default function SearchBar({ filters }) {
    const [search, setSearch] = useState(filters.search || "");

    const handleSearch = useCallback(
        debounce((value) => {
            router.get(
                "/dashboard",
                { search: value },
                { preserveState: true, replace: true }
            );
        }, 500),
        []
    );

    const onChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        handleSearch(value);
    };

    return (
        <div className="mb-6">
            <div className="relative max-w-md">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </span>
                <input
                    type="text"
                    value={search}
                    onChange={onChange}
                    placeholder="Cari berdasarkan nama atau NIP..."
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-2xl bg-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                />
            </div>
        </div>
    );
}
