<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
      $depts = ['IT', 'HR', 'Marketing', 'Finance', 'Production'];
    foreach($depts as $d) \App\Models\Department::create(['name' => $d]);

    $posts = ['Manager', 'Developer', 'Designer', 'Admin', 'Analyst'];
    foreach($posts as $p) \App\Models\Position::create(['name' => $p]);

    $deptIds = \App\Models\Department::pluck('id')->toArray();
    $postIds = \App\Models\Position::pluck('id')->toArray();

    Employee::factory(50)->make()->each(function($employee) use ($deptIds, $postIds) {
        $employee->department_id = $deptIds[array_rand($deptIds)];
        $employee->position_id = $postIds[array_rand($postIds)];
        $employee->save();
    });
    }
}
