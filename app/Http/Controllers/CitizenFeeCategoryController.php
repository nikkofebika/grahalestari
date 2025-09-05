<?php

namespace App\Http\Controllers;

use App\Helpers\Permission\PermissionResolver;
use App\Http\Requests\GeneralSearchRequest;
use App\Http\Requests\CitizenFeeCategory\StoreRequest;
use App\Http\Resources\DefaultResource;
use App\Interfaces\Controllers\HasSearch;
use App\Interfaces\Services\Coa\CoaServiceInterface;
use App\Interfaces\Services\CitizenFee\CitizenFeeCategoryServiceInterface;
use App\Models\CitizenFee;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\AllowedFilter;

class CitizenFeeCategoryController extends Controller implements HasSearch
{
    public function __construct(
        protected CitizenFeeCategoryServiceInterface $service,
        protected CoaServiceInterface $coaService,
    ) {
        parent::__construct();
    }

    public function search(): AnonymousResourceCollection
    {
        $datas = $this->service->findAllPaginate(
            $this->per_page,
            allowedFilters: [
                AllowedFilter::exact('tenant_id'),
                AllowedFilter::scope('search')
            ],
            allowedFields: ['id', 'name'],
        );

        return \App\Http\Resources\GeneralResource::collection($datas);
    }

    public function index(GeneralSearchRequest $request)
    {
        Gate::authorize('viewAny', CitizenFee::class);

        $datas = $this->service->findAllPaginate(
            $this->per_page,
            fn($q) => $q->with([
                'debitCoa' => fn($q) => $q->selectMinimalist(),
                'creditCoa' => fn($q) => $q->selectMinimalist()
            ]),
            allowedFilters: [
                AllowedFilter::exact('tenant_id'),
                AllowedFilter::scope('search')
            ],
            allowedFields: ['id', 'name']
        );

        return Inertia::render('citizen-fee-categories/index/index', [
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

        $debitAccounts = $this->coaService->getKasAccounts();
        $creditAccounts = $this->coaService->getPendapatanAccounts();

        return Inertia::render('citizen-fee-categories/create/index', [
            'debit_accounts' => $debitAccounts,
            'credit_accounts' => $creditAccounts,
        ]);
    }

    public function store(StoreRequest $request)
    {
        Gate::authorize('create', CitizenFee::class);

        $this->service->create($request->validated());
        return to_route('kategori-iuran-warga.index')->with('success', self::CREATED_MESSAGE);
    }

    public function show(string $id): Response
    {
        $citizenFeeCategory = $this->service->findById($id);

        Gate::authorize('view', $citizenFeeCategory);

        $citizenFeeCategory->load([
            'debitCoa' => fn($q) => $q->selectMinimalist(),
            'creditCoa' => fn($q) => $q->selectMinimalist(),
            'tenant' => fn($q) => $q->selectMinimalist(),
            'createdBy' => fn($q) => $q->selectMinimalist(),
            'updatedBy' => fn($q) => $q->selectMinimalist(),
            'deletedBy' => fn($q) => $q->selectMinimalist(),
        ]);

        return Inertia::render('citizen-fee-categories/show/index', [
            'data' => $citizenFeeCategory,
        ]);
    }

    public function edit(string $id)
    {
        $citizenFeeCategory = $this->service->findById($id);

        Gate::authorize('update', $citizenFeeCategory);

        $citizenFeeCategory->load([
            'tenant' => fn($q) => $q->selectMinimalist(),
        ]);

        $debitAccounts = $this->coaService->getKasAccounts();
        $creditAccounts = $this->coaService->getPendapatanAccounts();

        return Inertia::render('citizen-fee-categories/edit/index', [
            'data' => $citizenFeeCategory,
            'debit_accounts' => $debitAccounts,
            'credit_accounts' => $creditAccounts,
        ]);
    }

    public function update(StoreRequest $request, string $id)
    {
        $citizenFeeCategory = $this->service->findById($id);

        Gate::authorize('update', $citizenFeeCategory);

        $this->service->update($id, $request->validated());
        return to_route('kategori-iuran-warga.index')->with('success', self::UPDATED_MESSAGE);
    }

    public function destroy(string $id)
    {
        $citizenFeeCategory = $this->service->findById($id);

        Gate::authorize('delete', $citizenFeeCategory);

        $this->service->delete($id);
        return redirect()->back()->with('success', self::DELETED_MESSAGE);
    }
}
