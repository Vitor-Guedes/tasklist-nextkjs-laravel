<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Arr;
use Illuminate\Testing\Fluent\AssertableJson;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    Use RefreshDatabase;

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

    public function test_should_be_able_to_create_a_new_user(): void
    {
        $payload = $this->baseUser();
        $email = $payload['email'];
        $response = $this->postJson(route('api.user.register'), $payload);

        $response->assertStatus(200);
        $response->assertJson(function (AssertableJson $json) use ($email) {
            $json->has('token')
                ->has('token_type')
                ->has('expires_in')
                ->has('user')
                ->where('user.email', $email);
        });
        $this->assertDatabaseHas('users', [
            'email' => $email
        ]);
    }
    
    public function test_must_be_able_to_authenticate_user(): void
    {
        $this->createBaseUser();

        $credentials = Arr::only($this->baseUser(), ['email', 'password']);
        $response = $this->postJson(route('api.user.login'), $credentials);

        $response->assertStatus(200);
        $response->assertJson(function (AssertableJson $json) {
            $json->has('token')
                ->has('token_type')
                ->has('expires_in')
                ->has('user');
        });
    }

    public function test_should_fail_because_it_is_not_authorized(): void
    {
        $response = $this->getJson(route('api.user.me'));

        $response->assertStatus(401);
    }

    public function test_should_be_able_to_log_out(): void
    {
        $this->createBaseUser();
        $credentials = Arr::only($this->baseUser(), ['email', 'password']);
       
        $credentials = Arr::only($this->baseUser(), ['email', 'password']);
        $token = $this->postJson(route('api.user.login'), $credentials)->json('token');

        // test logout
        $logoutResponse = $this->getJson(route('api.user.logout'), [
            'Authorization' => "Bearer $token"
        ]);
        $logoutResponse->assertStatus(200);

        // test logout
        $logoutResponse = $this->getJson(route('api.user.me'), [
            'Authorization' => "Bearer $token"
        ]);
        $logoutResponse->assertStatus(401);
    }
}
