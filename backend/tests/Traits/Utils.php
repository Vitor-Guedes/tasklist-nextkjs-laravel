<?php

namespace Tests\Traits;

use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

trait Utils
{
    protected function baseUser()
    {
        return [
            'name' => 'User Test',
            'email' => 'teste@teste.com',
            'password' => '!pass@teste.1',
            'password_confirmation' => '!pass@teste.1'
        ];
    }

    protected function createBaseUser()
    {
        User::create(Arr::except($this->baseUser(), ['password_confirmation']));
    }

    public function createUser(): User
    {
        return User::factory()->create();
    }
    
    public function createTask(User $for): Task
    {
        return Task::factory()->for($for)->create();
    }

    public function createManyTask(User $for, int $count = 2): Collection
    {
        return Task::factory()->count($count)->for($for)->create();
    }

    public function taskData(): Task
    {
        return Task::factory()->make();
    }

    public function getBaseHeaders(User $user): array
    {
        $credentials = [
            'email' => $user->email,
            'password' => 'password'
        ];

        $token = $this->postJson(
            route('api.user.login'), 
            $credentials
        )->json('token');
        
        return [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
            'Authorization' => "Bearer $token",
        ];
    }
}