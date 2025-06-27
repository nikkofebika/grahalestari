<?php

use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::controller(\App\Http\Controllers\RegionController::class)
    ->prefix('region')
    ->group(function () {
        Route::get('/provinces/{id?}', 'getProvinces');
        Route::get('/cities/{province_id}/{id?}', 'getCities');
        Route::get('/districts/{city_id}/{id?}', 'getDistricts');
        Route::get('/villages/{district_id}/{id?}', 'getVillages');
    });

Route::controller(\App\Http\Controllers\Api\AuthController::class)
    ->middleware('auth:api')
    ->prefix('auth')
    ->group(function () {
        Route::post('/token', 'token');
        Route::post('logout', 'logout');
        Route::post('refresh', 'refresh');
        Route::get('me', 'me');
    });

// Route::middleware(['auth', 'verified'])->group(function () {

// Route::get('get-groups', [GroupController::class, 'getGroups']);
// Route::resource('groups', GroupController::class);

// Route::get('search-rw', [RwController::class, 'search']);
// Route::resource('rw', RwController::class);

// Route::get('search-rt', [RtController::class, 'search']);
// Route::resource('rt', RtController::class);

// Route::get('search-users', [UserController::class, 'search']);
Route::apiResource('users', UserController::class);
// Route::resource('roles', RoleController::class);
// });
