<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    TaskController,
    UserController
};

Route::prefix('user')
    ->controller(UserController::class)
    ->group(function () {
        Route::post('register', 'register')->name('api.user.register');
        Route::post('login', 'authenticate')->name('api.user.login');

        Route::middleware('auth:api')->group(function () {
            Route::get('me', 'me')->name('api.user.me');
            Route::get('logout', 'logout')->name('api.user.logout');

            // user tasks
            Route::prefix('tasks')
                ->controller(TaskController::class)
                ->group(function () {
                    Route::get('', 'index');
                    Route::get('/{id}', 'task');
                    Route::post('', 'store');
                    Route::put('/{id}', 'update');
                });
        });

    });