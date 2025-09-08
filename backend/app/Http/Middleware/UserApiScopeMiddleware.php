<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Task;
use Illuminate\Http\Request;
use App\Models\Scopes\UserScope;
use App\Observers\UserTaskObserver;
use Symfony\Component\HttpFoundation\Response;

class UserApiScopeMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth('api')->check()) {
            Task::observe(UserTaskObserver::class);
            Task::addGlobalScope('user', new UserScope);
        }

        return $next($request);
    }
}
