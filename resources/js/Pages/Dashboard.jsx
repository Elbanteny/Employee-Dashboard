import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import StatCard from "@/Components/StatCard";
import SearchBar from "@/Components/SearchBar";
import AddEmployeeModal from "@/Components/AddEmployeeModal";
import Toast from "@/Components/Toast";
import { useState } from "react";
import Barcharts from "@/Components/Barcharts";

export default function Dashboard({
    auth,
    totalEmployees = 0,
    totalDepartments = 0,
    newEmployees = 0,
    employees,
    filters,
    departments,
    positions,
    chartData = [],
}) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-bold text-xl text-gray-800 leading-tight">
                    Buku Induk Karyawan
                </h2>
            }
        >
            <Head title="Employee Dashboard" />

            <Toast />

            <div className="py-12 bg-[#f8fafc] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-gray-900">
                                Selamat Datang, {auth.user.name}!
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Kelola data karyawan perusahaan Anda secara
                                efisien.
                            </p>
                        </div>
                        <button
                            className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100 active:scale-95 cursor-pointer"
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            <span className="mr-2 text-xl">+</span> Tambah
                            Karyawan
                        </button>

                        <AddEmployeeModal
                            isOpen={isAddModalOpen}
                            onClose={() => setIsAddModalOpen(false)}
                            departments={departments}
                            positions={positions}
                        />
                    </div>

                    {/* Stat Cards Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        <StatCard
                            title="Total Karyawan"
                            value={totalEmployees}
                            color="blue"
                        />
                        <StatCard
                            title="Jumlah Departemen"
                            value={totalDepartments}
                            color="purple"
                        />
                        <StatCard
                            title="Karyawan Baru"
                            value={newEmployees}
                            color="green"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 mb-10">
                        <Barcharts chartData={chartData} />
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <SearchBar filters={filters} />
                    </div>

                    {/* Table Section */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-800 text-left">
                                Daftar Karyawan
                            </h2>
                            <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
                                Halaman {employees.current_page} dari{" "}
                                {employees.last_page}
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 text-gray-400 uppercase text-[11px] font-bold tracking-widest border-b border-gray-100">
                                        <th className="px-6 py-4">
                                            Informasi Karyawan
                                        </th>
                                        <th className="px-6 py-4">Jabatan</th>
                                        <th className="px-6 py-4">
                                            Departemen
                                        </th>
                                        <th className="px-6 py-4">
                                            Tanggal Masuk
                                        </th>
                                        <th className="px-6 py-4 text-right">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {employees.data.length > 0 ? (
                                        employees.data.map((emp) => (
                                            <tr
                                                key={emp.id}
                                                className="hover:bg-blue-50/30 transition-colors group"
                                            >
                                                <td className="px-6 py-4 text-left">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold overflow-hidden border border-blue-50">
                                                            {emp.photo ? (
                                                                <img
                                                                    src={`/storage/${emp.photo}`}
                                                                    className="h-full w-full object-cover"
                                                                    alt=""
                                                                />
                                                            ) : (
                                                                emp.name
                                                                    .charAt(0)
                                                                    .toUpperCase()
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-gray-800 group-hover:text-blue-600 transition">
                                                                {emp.name}
                                                            </div>
                                                            <div className="text-xs font-mono text-gray-400 lowercase">
                                                                {emp.nip}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-600 text-left">
                                                    {emp.position?.name || "-"}
                                                </td>
                                                <td className="px-6 py-4 text-left">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-600 uppercase tracking-wider">
                                                        {emp.department?.name ||
                                                            "Umum"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500 text-left">
                                                    {new Date(
                                                        emp.joined_date
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        { dateStyle: "medium" }
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link
                                                        href={`/employees/${emp.id}`}
                                                        className="inline-flex items-center px-4 py-2 bg-gray-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                                                    >
                                                        Detail
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-6 py-20 text-center text-gray-400"
                                            >
                                                Belum ada data karyawan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50/30">
                            <Pagination links={employees.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
