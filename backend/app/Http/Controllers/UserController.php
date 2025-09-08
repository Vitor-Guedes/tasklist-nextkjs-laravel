<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function register()
    {
        $validated = request()->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string|min:8|max:150',
            'password' => 'required|confirmed|string|min:8|max:150',
            'password_confirmation' => 'required',
        ]);

        $user = User::create($validated);

        $token = Auth::fromUser($user);

        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => $user
        ]);
    }

    public function authenticate()
    {
        $credentials = request()->only(['email', 'password']);

        $token = Auth::attempt($credentials);
        if (! $token) {
            return response()->json([
                'message' => 'Credenciais inválidas'
            ], Response::HTTP_UNAUTHORIZED);
        }

        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ], Response::HTTP_OK);
    }

    public function me()
    {
        return response()->json(auth()->user(), Response::HTTP_OK);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'message' => 'Logou Realizado'
        ], Response::HTTP_OK);
    }

    
}