<?php

namespace Tests\Feature;

use Tests\TestCase;
use Tests\Traits\Utils;
use Illuminate\Support\Arr;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTaskTest extends TestCase
{
    Use RefreshDatabase,
        Utils;
        
    public function test_must_be_able_to_create_tasks_for_the_user()
    {
        $user = $this->createUser();
        $payload = $this->taskData()->toArray();

        $response = $this->postJson(
            route('api.user.tasks.store'), 
            $payload, 
            $this->getBaseHeaders($user)
        );

        $response->assertStatus(200);
        $this->assertDatabaseCount('tasks', 1);
        $this->assertDatabaseHas('tasks', [
            'title' => $payload['title'],
            'status' => $payload['status'],
            'user_id' => $user->id
        ]);
    }

    public function test_must_be_able_to_update_the_user_task()
    {
        $user = $this->createUser();
        $task = $this->createtask($user);
        $payload = Arr::only($this->taskData()->toArray(), ['title', 'status']);

        $response = $this->putJson(route('api.user.tasks.update', [
            'id' => $task->id
        ]), $payload, $this->getBaseHeaders($user));

        $response->assertStatus(200);
        $this->assertDatabaseCount('tasks', 1);
        $this->assertDatabaseHas('tasks', [
            'title' => $payload['title'],
            'status' => $payload['status'],
            'user_id' => $user->id,
            'id' => $task->id
        ]);
    }

    public function test_must_be_able_to_delete_the_users_task()
    {
        $user = $this->createUser();
        $task = $this->createtask($user);

        $response = $this->deleteJson(route('api.user.tasks.delete', [
            'id' => $task->id
        ]), $this->getBaseHeaders($user));

        $response->assertStatus(200);
        $this->assertDatabaseCount('tasks', 0);
    }

    public function test_must_be_able_to_list_all_user_tasks()
    {
        $firstUser = $this->createUser();
        $secondUser = $this->createUser();
        $thirdUser = $this->createUser();
        $countFirstUser = 1;
        $countSecondUser = 2;
        $countThirdUser = 3;

        $this->createTask($firstUser);
        $this->createManyTask($secondUser, $countSecondUser);
        $this->createManyTask($thirdUser, $countThirdUser);

        $firstResponse = $this->getJson(
            route('api.user.tasks.list'), 
            $this->getBaseHeaders($firstUser)
        );
        $secondResponse = $this->getJson(
            route('api.user.tasks.list'), 
            $this->getBaseHeaders($secondUser)
        );
        $thirdResponse = $this->getJson(
            route('api.user.tasks.list'), 
            $this->getBaseHeaders($thirdUser)
        );

        $firstResponse->assertStatus(200);
        $secondResponse->assertStatus(200);
        $thirdResponse->assertStatus(200);
        $firstResponse->assertJsonCount($countFirstUser, 'data');
        $secondResponse->assertJsonCount($countSecondUser, 'data');
        $thirdResponse->assertJsonCount($countThirdUser, 'data');
    }

    public function test_must_be_able_to_get_data_from_a_specific_user_task()
    {
        $firstUser = $this->createUser();
        $secondUser = $this->createUser();

        $task = $this->createTask($firstUser);
        $this->createManyTask($secondUser, 2);

        $response = $this->getJson(
            route('api.user.tasks.one', [
                'id' => $task->id
            ]), 
            $this->getBaseHeaders($firstUser)
        );

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'user_id' => $firstUser->id
        ]);
    }

    public function test_should_not_return_another_users_task()
    {
        $firstUser = $this->createUser();
        $secondUser = $this->createUser();

        $task = $this->createTask($firstUser);
        $this->createManyTask($secondUser, 2);

        $response = $this->getJson(
            route('api.user.tasks.one', [
                'id' => $task->id
            ]), 
            $this->getBaseHeaders($secondUser)
        );

        $response->assertStatus(404);
    }
}