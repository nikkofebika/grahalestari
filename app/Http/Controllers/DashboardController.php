<?php

namespace App\Http\Controllers;

use App\Http\Services\Dashboard\DashboardService;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(protected DashboardService $service) {}

    public function index()
    {
        return Inertia::render('dashboard/index', [
            'byGender' => Inertia::defer(fn() => $this->service->byGender(), 'demografi'),
            'byEducation' => Inertia::defer(fn() => $this->service->byEducation(), 'demografi'),
            'byReligion' => Inertia::defer(fn() => $this->service->byReligion(), 'demografi'),
            'byMaritalStatus' => Inertia::defer(fn() => $this->service->byMaritalStatus(), 'demografi'),
        ]);
    }
}
