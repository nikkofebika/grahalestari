<?php

namespace App\Http\Controllers;

use App\Helpers\Permission\PermissionResolver;
use App\Http\Requests\GeneralSearchRequest;
use App\Http\Requests\ProfitActivityCategory\StoreRequest;
use App\Http\Resources\DefaultResource;
use App\Interfaces\Controllers\HasSearch;
use App\Interfaces\Services\Coa\CoaServiceInterface;
use App\Interfaces\Services\ProfitActivity\ProfitActivityCategoryServiceInterface;
use App\Models\ProfitActivity;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\AllowedFilter;

class ProfitActivityCategoryController extends Controller implements HasSearch
{
    public function __construct(
        protected ProfitActivityCategoryServiceInterface $service,
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
        Gate::authorize('viewAny', ProfitActivity::class);

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

        return Inertia::render('profit-activity-categories/index/index', [
            'datas' => DefaultResource::collection($datas),
            'filters' => [
                'search' => $request->filter['search'] ?? ""
            ],
            'page' => $request->page ?? 1,
            'per_page' => $this->per_page,
            'permission_actions' => PermissionResolver::forActions(ProfitActivity::class),
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', ProfitActivity::class);

        $debitAccounts = $this->coaService->getKasAccounts();
        $creditAccounts = $this->coaService->getPendapatanAccounts();

        return Inertia::render('profit-activity-categories/create/index', [
            'debit_accounts' => $debitAccounts,
            'credit_accounts' => $creditAccounts,
        ]);
    }

    public function store(StoreRequest $request)
    {
        Gate::authorize('create', ProfitActivity::class);

        $this->service->create($request->validated());
        return to_route('kategori-kegiatan-profit.index')->with('success', self::CREATED_MESSAGE);
    }

    public function show(string $id): Response
    {
        $profitActivityCategory = $this->service->findById($id);

        Gate::authorize('view', $profitActivityCategory);

        $profitActivityCategory->load([
            'debitCoa' => fn($q) => $q->selectMinimalist(),
            'creditCoa' => fn($q) => $q->selectMinimalist(),
            'tenant' => fn($q) => $q->selectMinimalist(),
            'createdBy' => fn($q) => $q->selectMinimalist(),
            'updatedBy' => fn($q) => $q->selectMinimalist(),
            'deletedBy' => fn($q) => $q->selectMinimalist(),
        ]);

        return Inertia::render('profit-activity-categories/show/index', [
            'data' => $profitActivityCategory,
        ]);
    }

    public function edit(string $id)
    {
        $profitActivityCategory = $this->service->findById($id);

        Gate::authorize('update', $profitActivityCategory);

        $profitActivityCategory->load([
            'tenant' => fn($q) => $q->selectMinimalist(),
        ]);

        $debitAccounts = $this->coaService->getKasAccounts();
        $creditAccounts = $this->coaService->getPendapatanAccounts();

        return Inertia::render('profit-activity-categories/edit/index', [
            'data' => $profitActivityCategory,
            'debit_accounts' => $debitAccounts,
            'credit_accounts' => $creditAccounts,
        ]);
    }

    public function update(StoreRequest $request, string $id)
    {
        $profitActivityCategory = $this->service->findById($id);

        Gate::authorize('update', $profitActivityCategory);

        $this->service->update($id, $request->validated());
        return to_route('kategori-kegiatan-profit.index')->with('success', self::UPDATED_MESSAGE);
    }

    public function destroy(string $id)
    {
        $profitActivityCategory = $this->service->findById($id);

        Gate::authorize('delete', $profitActivityCategory);

        $this->service->delete($id);
        return redirect()->back()->with('success', self::DELETED_MESSAGE);
    }
}
