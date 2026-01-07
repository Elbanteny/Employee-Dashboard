import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

export default function Toast() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (flash?.message) {
            setMessage(flash.message);
            setVisible(true);

            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000); // Hilang setelah 3 detik

            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!visible) return null;

    return (
        <div className="fixed top-5 right-5 z-100 animate-bounce-in">
            <div className="bg-white border-l-4 border-green-500 shadow-2xl rounded-2xl p-4 flex items-center gap-4 min-w-75">
                <div className="bg-green-100 p-2 rounded-full">
                    <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Berhasil
                    </p>
                    <p className="text-sm font-bold text-gray-800">{message}</p>
                </div>
                <button
                    onClick={() => setVisible(false)}
                    className="ml-auto text-gray-300 hover:text-gray-500"
                >
                    <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
