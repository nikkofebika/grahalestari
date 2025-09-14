<?php

namespace App\Http\Controllers;

use App\Helpers\Permission\PermissionResolver;
use App\Http\Requests\GeneralSearchRequest;
use App\Http\Requests\Journal\JouralIndexRequest;
use App\Http\Resources\DefaultResource;
use App\Models\LaporanKeuangan;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;

class LaporanKeuanganController extends Controller
{
    public function index(JouralIndexRequest $request)
    {
        // Gate::authorize('viewAny', LaporanKeuangan::class);


        return Inertia::render('laporan-keuangan/index/index', [
            // 'datas' => DefaultResource::collection($datas),
            'filters' => [
                'period' => $request->filter['period'] ?? ""
            ],
            'page' => $request->page ?? 1,
            'per_page' => $this->per_page,
            // 'permission_actions' => PermissionResolver::forActions(LaporanKeuangan::class),
        ]);
    }
}
