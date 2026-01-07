import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import DeleteModal from "@/Components/DeleteModal";
import EditEmployeeModal from "@/Components/EditEmployeeModal";
import Toast from "../../Components/Toast";

export default function Show({ employee, departments, positions }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const {
        data,
        setData,
        post,
        delete: destroy,
        processing,
        errors,
    } = useForm({
        name: employee.name,
        position_id: employee.position_id,
        department_id: employee.department_id,
        email: employee.email,
        phone: employee.phone,
        photo: null,
        _method: "put",
    });

    const handleDelete = () => {
        destroy(`/employees/${employee.id}`, {
            onSuccess: () => setShowDeleteModal(false),
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        post(`/employees/${employee.id}`, {
            onSuccess: () => setIsEditModalOpen(false),
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <Toast />
            <Head title={`Detail - ${employee.name}`} />

            <div className="max-w-3xl mx-auto">
                <Link
                    href="/"
                    className="text-blue-600 hover:underline mb-6 inline-block font-medium"
                >
                    ← Kembali ke Dashboard
                </Link>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative">
                    <div className="bg-blue-600 p-8 text-white">
                        <div className="flex items-center gap-6">
                            <div className="h-20 w-20 bg-white/20 rounded-2xl overflow-hidden flex items-center justify-center text-3xl font-bold uppercase">
                                {employee.photo ? (
                                    <img
                                        src={`/storage/${employee.photo}`}
                                        className="h-full w-full object-cover"
                                        alt=""
                                    />
                                ) : (
                                    employee.name.charAt(0)
                                )}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">
                                    {employee.name}
                                </h1>
                                <p className="opacity-80">
                                    {employee.position?.name} •{" "}
                                    {employee.department?.name}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InfoItem label="NIP" value={employee.nip} />
                        <InfoItem label="Email" value={employee.email} />
                        <InfoItem label="Telepon" value={employee.phone} />
                        <InfoItem
                            label="Tanggal Bergabung"
                            value={new Date(
                                employee.joined_date
                            ).toLocaleDateString("id-ID", {
                                dateStyle: "long",
                            })}
                        />
                    </div>

                    <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="text-red-600 font-bold px-6 py-2 hover:bg-red-100 rounded-xl border border-red-600 cursor-pointer"
                        >
                            Hapus
                        </button>
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 cursor-pointer"
                        >
                            Edit Profil
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal Konfirmasi Hapus */}
            <DeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                name={employee.name}
                processing={processing}
            />

            <EditEmployeeModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleUpdate}
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                departments={departments}
                positions={positions}
            />
        </div>
    );
}

function InfoItem({ label, value }) {
    return (
        <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                {label}
            </p>
            <p className="text-gray-900 font-semibold">{value || "-"}</p>
        </div>
    );
}
