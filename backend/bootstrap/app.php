<?php

use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Http\Middleware\HandleCors;
use App\Http\Middleware\UserApiScopeMiddleware;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->appendToGroup('api', HandleCors::class);
        $middleware->appendToGroup('api', UserApiScopeMiddleware::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (NotFoundHttpException $exception, Request $request) {
            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Recurso não encontrada.'
                ], 404);
            }
        });
    })->create();
