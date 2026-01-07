<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'nip' => fake()->unique()->numerify('EMP-#####'),
        'name' => fake()->name(),
        'email' => fake()->unique()->safeEmail(),
        'phone' => fake()->phoneNumber(),
        'position_id' => \App\Models\Position::inRandomOrder()->first()->id,
        'department_id' => \App\Models\Department::inRandomOrder()->first()->id,
        'joined_date' => fake()->date(),
        'photo' => null,
    ];
    }
}
