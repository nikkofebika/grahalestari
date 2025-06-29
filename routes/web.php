<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\RtController;
use App\Http\Controllers\RwController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::controller(\App\Http\Controllers\RegionController::class)
    ->prefix('region')
    ->group(function () {
        Route::get('/provinces/{id?}', 'getProvinces');
        Route::get('/cities/{province_id}/{id?}', 'getCities');
        Route::get('/districts/{city_id}/{id?}', 'getDistricts');
        Route::get('/villages/{district_id}/{id?}', 'getVillages');
    });

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('get-tenants', [TenantController::class, 'getTenants']);
    Route::resource('tenants', TenantController::class);

    Route::get('search-rw', [RwController::class, 'search']);
    Route::resource('rw', RwController::class);

    Route::get('search-rt', [RtController::class, 'search']);
    Route::resource('rt', RtController::class);

    Route::get('search-pengumuman', [AnnouncementController::class, 'search']);
    Route::resource('pengumuman', AnnouncementController::class);

    Route::get('search-aduan-masyarakat', [ComplaintController::class, 'search']);
    Route::resource('aduan-masyarakat', ComplaintController::class);

    Route::get('search-users', [UserController::class, 'search']);
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
