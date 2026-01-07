import SelectField from "./SelectField";
import InputField from "./InputField";

export default function EditEmployeeModal({
    isOpen,
    onClose,
    onSubmit,
    data,
    setData,
    errors,
    processing,
    departments = [],
    positions = [],
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <form
                onSubmit={onSubmit}
                className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl overflow-y-auto max-h-[90vh]"
            >
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    Edit Karyawan
                </h2>
                <div className="space-y-4">
                    {/* Foto Profil */}
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                            Ganti Foto Profil
                        </label>
                        <input
                            type="file"
                            onChange={(e) =>
                                setData("photo", e.target.files[0])
                            }
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all"
                        />
                        {errors.photo && (
                            <div className="text-red-500 text-[10px] mt-1 font-bold">
                                {errors.photo}
                            </div>
                        )}
                    </div>
                    <InputField
                        label="Nama Lengkap"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        error={errors.name}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <SelectField
                            label="Jabatan"
                            options={positions}
                            value={data.position_id}
                            onChange={(e) =>
                                setData("position_id", e.target.value)
                            }
                            error={errors.position_id}
                        />
                        <SelectField
                            label="Departemen"
                            options={departments}
                            value={data.department_id}
                            onChange={(e) =>
                                setData("department_id", e.target.value)
                            }
                            error={errors.department_id}
                        />
                    </div>

                    <InputField
                        label="Email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        error={errors.email}
                    />
                    <InputField
                        label="Telepon"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        error={errors.phone}
                    />
                </div>

                <div className="flex gap-3 mt-8">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 cursor-pointer"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 disabled:opacity-50 hover:bg-blue-700 transition-all cursor-pointer"
                    >
                        {processing ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                </div>
            </form>
        </div>
    );
}
