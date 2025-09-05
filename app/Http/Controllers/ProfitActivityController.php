<?php

namespace App\Http\Controllers;

use App\Helpers\Permission\PermissionResolver;
use App\Http\Requests\GeneralSearchRequest;
use App\Http\Requests\ProfitActivity\StoreRequest;
use App\Http\Resources\DefaultResource;
use App\Interfaces\Controllers\HasSearch;
use App\Interfaces\Services\ProfitActivity\ProfitActivityServiceInterface;
use App\Models\ProfitActivity;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\AllowedFilter;

class ProfitActivityController extends Controller implements HasSearch
{
    public function __construct(protected ProfitActivityServiceInterface $service)
    {
        parent::__construct();
    }

    public function search(): AnonymousResourceCollection
    {
        $datas = $this->service->findAllPaginate(
            $this->per_page,
            allowedIncludes: [
                AllowedFilter::callback('category', fn($q) => $q->selectMinimalist())
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
        Gate::authorize('viewAny', ProfitActivity::class);

        $datas = $this->service->findAllPaginate(
            $this->per_page,
            fn($q) => $q->with('category', fn($q) => $q->selectMinimalist()),
            [
                AllowedFilter::exact('profit_activity_category_id'),
                AllowedFilter::scope('search')
            ],
            allowedFields: ['id', 'name']
        );

        return Inertia::render('profit-activities/index/index', [
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

        return Inertia::render('profit-activities/create/index');
    }

    public function store(StoreRequest $request)
    {
        Gate::authorize('create', ProfitActivity::class);

        $this->service->create($request->validated());
        return to_route('kegiatan-profit.index')->with('success', self::CREATED_MESSAGE);
    }

    public function show(string $id): Response
    {
        $profitActivity = $this->service->findById($id);

        Gate::authorize('view', $profitActivity);

        $profitActivity->load([
            'media',
            'category' => fn($q) => $q->selectMinimalist(['tenant_id'])->with('tenant', fn($q) => $q->selectMinimalist()),
            'createdBy' => fn($q) => $q->selectMinimalist(),
            'updatedBy' => fn($q) => $q->selectMinimalist(),
            'deletedBy' => fn($q) => $q->selectMinimalist(),
        ]);

        return Inertia::render('profit-activities/show/index', [
            'data' => $profitActivity,
        ]);
    }

    public function edit(string $id)
    {
        $profitActivity = $this->service->findById($id);

        Gate::authorize('update', $profitActivity);

        $profitActivity->load([
            'category' => fn($q) => $q->selectMinimalist(['tenant_id'])->with('tenant', fn($q) => $q->selectMinimalist()),
        ]);

        return Inertia::render('profit-activities/edit/index', [
            'data' => $profitActivity
        ]);
    }

    public function update(StoreRequest $request, string $id)
    {
        $profitActivity = $this->service->findById($id);

        Gate::authorize('update', $profitActivity);

        $this->service->update($id, $request->validated());
        return to_route('kegiatan-profit.index')->with('success', self::UPDATED_MESSAGE);
    }

    public function destroy(string $id)
    {
        $profitActivity = $this->service->findById($id);

        Gate::authorize('delete', $profitActivity);

        $this->service->delete($id);
        return redirect()->back()->with('success', self::DELETED_MESSAGE);
    }
}
