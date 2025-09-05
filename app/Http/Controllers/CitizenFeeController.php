<?php

namespace App\Http\Controllers;

use App\Helpers\Permission\PermissionResolver;
use App\Http\Requests\GeneralSearchRequest;
use App\Http\Requests\CitizenFee\StoreRequest;
use App\Http\Resources\DefaultResource;
use App\Interfaces\Controllers\HasSearch;
use App\Interfaces\Services\CitizenFee\CitizenFeeServiceInterface;
use App\Models\CitizenFee;
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
        Gate::authorize('viewAny', CitizenFee::class);

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
            'permission_actions' => PermissionResolver::forActions(CitizenFee::class),
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', CitizenFee::class);

        return Inertia::render('profit-activities/create/index');
    }

    public function store(StoreRequest $request)
    {
        Gate::authorize('create', CitizenFee::class);

        $this->service->create($request->validated());
        return to_route('kegiatan-profit.index')->with('success', self::CREATED_MESSAGE);
    }

    public function show(string $id): Response
    {
        $CitizenFee = $this->service->findById($id);

        Gate::authorize('view', $CitizenFee);

        $CitizenFee->load([
            'media',
            'category' => fn($q) => $q->selectMinimalist(['tenant_id'])->with('tenant', fn($q) => $q->selectMinimalist()),
            'createdBy' => fn($q) => $q->selectMinimalist(),
            'updatedBy' => fn($q) => $q->selectMinimalist(),
            'deletedBy' => fn($q) => $q->selectMinimalist(),
        ]);

        return Inertia::render('profit-activities/show/index', [
            'data' => $CitizenFee,
        ]);
    }

    public function edit(string $id)
    {
        $CitizenFee = $this->service->findById($id);

        Gate::authorize('update', $CitizenFee);

        $CitizenFee->load([
            'category' => fn($q) => $q->selectMinimalist(['tenant_id'])->with('tenant', fn($q) => $q->selectMinimalist()),
        ]);

        return Inertia::render('profit-activities/edit/index', [
            'data' => $CitizenFee
        ]);
    }

    public function update(StoreRequest $request, string $id)
    {
        $CitizenFee = $this->service->findById($id);

        Gate::authorize('update', $CitizenFee);

        $this->service->update($id, $request->validated());
        return to_route('kegiatan-profit.index')->with('success', self::UPDATED_MESSAGE);
    }

    public function destroy(string $id)
    {
        $CitizenFee = $this->service->findById($id);

        Gate::authorize('delete', $CitizenFee);

        $this->service->delete($id);
        return redirect()->back()->with('success', self::DELETED_MESSAGE);
    }
}
