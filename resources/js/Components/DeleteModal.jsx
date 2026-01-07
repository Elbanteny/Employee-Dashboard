export default function DeleteModal({
    isOpen,
    onClose,
    onConfirm,
    name,
    processing,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Konfirmasi Hapus
                </h2>
                <p className="text-gray-500 mb-6">
                    Apakah Anda yakin ingin menghapus <strong>{name}</strong>?
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-semibold hover:bg-gray-200 transition cursor-pointer"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={processing}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 cursor-pointer"
                    >
                        {processing ? "Menghapus..." : "Ya, Hapus"}
                    </button>
                </div>
            </div>
        </div>
    );
}
