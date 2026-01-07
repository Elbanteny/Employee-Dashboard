import { useForm } from "@inertiajs/react";
import InputField from "./InputField";
import SelectField from "./SelectField";

export default function AddEmployeeModal({
    isOpen,
    onClose,
    departments = [],
    positions = [],
}) {
    if (!isOpen) return null;

    const { data, setData, post, processing, errors, reset } = useForm({
        nip: "",
        name: "",
        position_id: "",
        department_id: "",
        email: "",
        phone: "",
        joined_date: "",
        photo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post("/employees", {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <form
                onSubmit={submit}
                className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl overflow-y-auto max-h-[90vh]"
            >
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    Tambah Karyawan Baru
                </h2>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                            label="NIP"
                            value={data.nip}
                            onChange={(e) => setData("nip", e.target.value)}
                            error={errors.nip}
                        />
                        <InputField
                            label="Tanggal Masuk"
                            type="date"
                            value={data.joined_date}
                            onChange={(e) =>
                                setData("joined_date", e.target.value)
                            }
                            error={errors.joined_date}
                        />
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

                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            Foto Profil
                        </label>
                        <input
                            type="file"
                            onChange={(e) =>
                                setData("photo", e.target.files[0])
                            }
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {errors.photo && (
                            <div className="text-red-500 text-[10px] mt-1 font-bold uppercase">
                                {errors.photo}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-3 mt-8">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition cursor-pointer"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 disabled:opacity-50 cursor-pointer hover:bg-blue-700 transition"
                    >
                        {processing ? "Menyimpan..." : "Simpan Karyawan"}
                    </button>
                </div>
            </form>
        </div>
    );
}
