<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('/dashboard', [EmployeeController::class, 'index'])->name('dashboard');

    Route::get('/employees/{employee}', [EmployeeController::class, 'show'])->name('employees.show');
    
    Route::post('/employees', [EmployeeController::class, 'store'])->name('employees.store');
    
    Route::put('/employees/{employee}', [EmployeeController::class, 'update'])->name('employees.update');
    
    Route::delete('/employees/{employee}', [EmployeeController::class, 'destroy'])->name('employees.destroy');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';