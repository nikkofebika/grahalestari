<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * All of the container bindings that should be registered.
     *
     * @var array
     */
    public $singletons = [
        \App\Interfaces\Repositories\Announcement\AnnouncementRepositoryInterface::class => \App\Http\Repositories\Announcement\AnnouncementRepository::class,
        \App\Interfaces\Services\Announcement\AnnouncementServiceInterface::class => \App\Http\Services\Announcement\AnnouncementService::class,

        \App\Interfaces\Repositories\Complaint\ComplaintRepositoryInterface::class => \App\Http\Repositories\Complaint\ComplaintRepository::class,
        \App\Interfaces\Services\Complaint\ComplaintServiceInterface::class => \App\Http\Services\Complaint\ComplaintService::class,

        \App\Interfaces\Repositories\Tenant\TenantRepositoryInterface::class => \App\Http\Repositories\Tenant\TenantRepository::class,
        \App\Interfaces\Services\Tenant\TenantServiceInterface::class => \App\Http\Services\Tenant\TenantService::class,

        \App\Interfaces\Repositories\User\UserRepositoryInterface::class => \App\Http\Repositories\User\UserRepository::class,
        \App\Interfaces\Services\User\UserServiceInterface::class => \App\Http\Services\User\UserService::class,

        \App\Interfaces\Repositories\Role\RoleRepositoryInterface::class => \App\Http\Repositories\Role\RoleRepository::class,
        \App\Interfaces\Services\Role\RoleServiceInterface::class => \App\Http\Services\Role\RoleService::class,
    ];

    /**
     * Register any application services.
     */
    public function register(): void {}

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
    }
}
