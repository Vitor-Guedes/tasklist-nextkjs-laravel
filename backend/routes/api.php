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
                    Route::get('', 'index')->name('api.user.tasks.list');
                    Route::get('/{id}', 'task')->name('api.user.tasks.one');
                    Route::post('', 'store')->name('api.user.tasks.store');
                    Route::put('/{id}', 'update')->name('api.user.tasks.update');
                    Route::delete('/{id}', 'delete')->name('api.user.tasks.delete');
                });
        });

    });