<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = ['pending', 'in_progress', 'complete'];
        return [
            'title' => $this->faker->sentence(rand(2, 5)),
            'status' => $status[rand(0, 2)]
        ];
    }
}
