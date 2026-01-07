<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Employee;
use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    private function getValidationRules($employeeId = null)
    {
        return [
            'name'          => 'required|string|regex:/^[a-zA-Z\s\.,]*$/|max:255',
            'phone'         => ['required', 'regex:/^\+?[0-9]{10,15}$/'],
            'position_id'   => 'required|exists:positions,id',
            'department_id' => 'required|exists:departments,id',
            'email'         => 'required|email|unique:employees,email,' . $employeeId,
            'photo'         => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ];
    }

    private function getValidationMessages()
    {
        return [
            'name.regex'    => 'Nama hanya boleh berisi huruf, spasi, titik, atau koma (gelar).',
            'phone.regex'   => 'Format telepon tidak valid (Gunakan angka atau awali dengan +).',
        ];
    }

    public function index(Request $request)
    {
        $query = Employee::with(['department', 'position'])->latest();

        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('nip', 'like', "%{$request->search}%");
            });
        }

        $chartData = Department::withCount('employees')->get()->map(fn($dept) => [
            'name'  => $dept->name,
            'value' => $dept->employees_count
        ]);

        return Inertia::render('Dashboard', [
            'totalEmployees'   => Employee::count(),
            'totalDepartments' => Department::count(),
            'newEmployees'     => Employee::whereMonth('created_at', now()->month)->count(),
            'employees'        => $query->paginate(10)->withQueryString(),
            'departments'      => Department::all(),
            'positions'        => Position::all(),
            'filters'          => $request->only(['search']),
            'chartData'        => $chartData,
        ]);
    }

    public function show(Employee $employee)
    {
        return Inertia::render('Employees/Show', [
            'employee'    => $employee->load(['department', 'position']),
            'departments' => Department::all(),
            'positions'   => Position::all(),
        ]);
    }

    public function store(Request $request)
    {
        $rules = array_merge($this->getValidationRules(), [
            'nip'          => 'required|string|unique:employees,nip|max:20',
            'joined_date'  => 'required|date|before_or_equal:today',
        ]);

        $validated = $request->validate($rules, $this->getValidationMessages());

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('photos', 'public');
        }

        Employee::create($validated);

        return redirect()->route('dashboard')->with('message', 'Karyawan berhasil ditambahkan!');
    }

    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate(
            $this->getValidationRules($employee->id), 
            $this->getValidationMessages()
        );

        if ($request->hasFile('photo')) {
            if ($employee->photo) Storage::disk('public')->delete($employee->photo);
            $validated['photo'] = $request->file('photo')->store('photos', 'public');
        }

        $employee->update($validated);

        return redirect()->back()->with('message', 'Profil berhasil diperbarui');
    }

    public function destroy(Employee $employee)
    {
        if ($employee->photo) Storage::disk('public')->delete($employee->photo);
        $employee->delete();

        return redirect()->route('dashboard')->with('message', 'Karyawan berhasil dihapus');
    }
}