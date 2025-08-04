<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\CoaController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\JournalController;
use App\Http\Controllers\KepalaKeluargaController;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\RtController;
use App\Http\Controllers\RwController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::controller(\App\Http\Controllers\RegionController::class)
    ->prefix('region')
    ->group(function () {
        Route::get('/provinces', 'getProvinces')->name('region.provinces');
        Route::get('/cities/{province_id}', 'getCities')->name('region.cities');
        Route::get('/districts/{city_id}', 'getDistricts')->name('region.districts');
        Route::get('/villages/{district_id}', 'getVillages')->name('region.villages');
    });

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('search-aduan-masyarakat', [ComplaintController::class, 'search']);
    Route::resource('aduan-masyarakat', ComplaintController::class);

    Route::get('search-coas', [CoaController::class, 'search']);
    Route::resource('coas', CoaController::class);

    Route::get('search-journals', [JournalController::class, 'search']);
    Route::get('journals/create/{type}', [JournalController::class, 'create'])->name('journals.create');
    Route::post('journals/{type}', [JournalController::class, 'store'])->name('journals.store');
    Route::delete('journals/{journal}/force-delete', [JournalController::class, 'forceDelete'])->name('journals.force-delete');
    Route::resource('journals', JournalController::class)->except(['create', 'store', 'destroy']);

    Route::get('kepala-keluarga/export', [KepalaKeluargaController::class, 'export'])->name('kepala-keluarga.export');
    Route::delete('kepala-keluarga/{user_id}/delete-member/{member_id}', [KepalaKeluargaController::class, 'deleteMember'])->name('kepala-keluarga.delete-member');
    Route::resource('kepala-keluarga', KepalaKeluargaController::class);

    Route::get('search-pengumuman', [AnnouncementController::class, 'search']);
    Route::resource('pengumuman', AnnouncementController::class);

    Route::get('search-tenants', [TenantController::class, 'search']);
    Route::resource('tenants', TenantController::class);

    Route::get('transactions/create/{type}', [TransactionController::class, 'create'])->name('transactions.create');
    Route::post('transactions/{type}', [TransactionController::class, 'store'])->name('transactions.store');
    Route::delete('transactions/{journal}/force-delete', [TransactionController::class, 'forceDelete'])->name('transactions.force-delete');
    Route::resource('transactions', TransactionController::class)->except(['create', 'store', 'destroy']);

    Route::get('search-rw', [RwController::class, 'search']);
    Route::resource('rw', RwController::class);

    Route::get('search-rt', [RtController::class, 'search']);
    Route::resource('rt', RtController::class);

    Route::get('search-users', [UserController::class, 'search']);
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
