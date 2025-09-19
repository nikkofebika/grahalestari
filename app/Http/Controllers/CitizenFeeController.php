<?php

namespace App\Http\Controllers;

use App\Enums\CitizenFeePaymentStatus;
use App\Helpers\Permission\PermissionResolver;
use App\Http\Requests\GeneralSearchRequest;
use App\Http\Requests\CitizenFee\StoreRequest;
use App\Http\Resources\DefaultResource;
use App\Interfaces\Controllers\HasSearch;
use App\Interfaces\Services\CitizenFee\CitizenFeeServiceInterface;
use App\Models\CitizenFee;
use App\Models\CitizenFeeCategory;
use App\Models\User;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\AllowedFilter;

class CitizenFeeController extends Controller implements HasSearch
{
    public function __construct(protected CitizenFeeServiceInterface $service)
    {
        parent::__construct();
    }

    public function search(): AnonymousResourceCollection
    {
        $datas = $this->service->findAllPaginate(
            $this->per_page,
            allowedIncludes: [
                AllowedFilter::callback('category', fn($q) => $q->selectMinimalist(['fix_amount']))
            ],
            allowedFilters: [
                AllowedFilter::exact('profit_activity_category_id'),
                AllowedFilter::scope('search')
            ],
            allowedFields: ['id', 'name']
        );

        return \App\Http\Resources\GeneralResource::collection($datas);
    }

    public function index(GeneralSearchRequest $request)
    {
        Gate::authorize('viewAny', CitizenFee::class);

        $datas = $this->service->findAllPaginate(
            $this->per_page,
            fn($q) => $q->with('category', fn($q) => $q->selectMinimalist(['fix_amount'])),
            [
                AllowedFilter::exact('profit_activity_category_id'),
                AllowedFilter::scope('search')
            ],
            allowedFields: ['id', 'name']
        );

        return Inertia::render('citizen-fees/index/index', [
            'datas' => DefaultResource::collection($datas),
            'filters' => [
                'search' => $request->filter['search'] ?? ""
            ],
            'page' => $request->page ?? 1,
            'per_page' => $this->per_page,
            'permission_actions' => PermissionResolver::forActions(CitizenFee::class),
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', CitizenFee::class);

        return Inertia::render('citizen-fees/create/index');
    }

    public function store(StoreRequest $request)
    {
        Gate::authorize('create', CitizenFee::class);

        $this->service->create($request->validated());
        return to_route('iuran-warga.index')->with('success', self::CREATED_MESSAGE);
    }

    public function show(string $id): Response
    {
        $citizenFee = $this->service->findById($id);

        Gate::authorize('view', $citizenFee);

        $citizenFee->load([
            'media',
            'category' => fn($q) => $q->selectMinimalist(['tenant_id', 'fix_amount'])->with('tenant', fn($q) => $q->selectMinimalist()),
            'createdBy' => fn($q) => $q->selectMinimalist(),
            'updatedBy' => fn($q) => $q->selectMinimalist(),
            'deletedBy' => fn($q) => $q->selectMinimalist(),
        ]);

        return Inertia::render('citizen-fees/show/index', [
            'data' => $citizenFee,
        ]);
    }

    public function edit(string $id)
    {
        $citizenFee = $this->service->findById($id);

        Gate::authorize('update', $citizenFee);

        $citizenFee->load([
            'category' => fn($q) => $q->selectMinimalist(['tenant_id', 'fix_amount'])->with('tenant', fn($q) => $q->selectMinimalist()),
        ]);

        return Inertia::render('citizen-fees/edit/index', [
            'data' => $citizenFee
        ]);
    }

    public function update(StoreRequest $request, string $id)
    {
        $citizenFee = $this->service->findById($id);

        Gate::authorize('update', $citizenFee);

        $this->service->update($id, $request->validated());
        return to_route('iuran-warga.index')->with('success', self::UPDATED_MESSAGE);
    }

    public function destroy(string $id)
    {
        $citizenFee = $this->service->findById($id);

        Gate::authorize('delete', $citizenFee);

        $this->service->delete($id);
        return redirect()->back()->with('success', self::DELETED_MESSAGE);
    }

    public function getTotalPaidUsers(\Illuminate\Http\Request $request)
    {
        $items = $request->input('items', []);

        // ambil unique category_id
        $categoryIds = collect($items)
            ->pluck('citizen_fee_category_id')
            ->unique()
            ->values();

        // ambil semua kategori sekaligus
        $citizenFeeCategories = CitizenFeeCategory::whereIn('id', $categoryIds)->get();

        // ambil tenant_id unik dari kategori
        $tenantIds = $citizenFeeCategories->pluck('tenant_id')->unique()->values();

        // ambil semua user berdasarkan tenant_id (sekali query)
        $usersByTenant = User::whereIn('tenant_id', $tenantIds)
            ->get()
            ->groupBy('tenant_id');

        // ambil unique id citizen_fee
        $ids = collect($items)
            ->pluck('id')
            ->unique()
            ->values();

        // ambil semua citizen fee beserta pembayaran
        $citizenFees = CitizenFee::with(['category' => function ($q) {
            $q->select('id', 'tenant_id'); // select kolom yang lo mau
        }])
            ->withCount(['details as paid_users_count' => function ($q) {
                $q->where('payment_status', CitizenFeePaymentStatus::PAID);
            }])
            ->whereIn('id', $ids)
            ->get(['id', 'citizen_fee_category_id']);

        // hitung comparasi
        $result = $citizenFees->mapWithKeys(function ($fee) use ($usersByTenant) {
            $tenantId = $fee->category->tenant_id;
            $totalUsers = $usersByTenant[$tenantId]->count() ?? 0;
            $paidUsers = $fee->paid_users_count; // hasil dari withCount alias

            return [
                $fee->id => "{$paidUsers}/{$totalUsers}",
            ];
        });

        return response()->json($result);
    }
    // public function updateStatus(UpdateStatusRequest $request, int $id)
    // {
    //     $citizenFee = $this->service->findById($id);

    //     Gate::authorize('update', $citizenFee);

    //     $this->service->updateStatus($citizenFee, $request->validated());

    //     return redirect()->back()->with('success', self::UPDATED_MESSAGE);
    // }
}
