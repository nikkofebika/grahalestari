<?php

namespace App\Providers;

use App\Enums\UserType;
use Illuminate\Auth\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Gate::before(function ($user, $ability) {
            return $user->type->is(UserType::GOD);
        });
    }
}
