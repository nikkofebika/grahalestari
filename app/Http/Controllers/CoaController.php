<?php

namespace App\Http\Controllers;

use App\Helpers\Permission\PermissionResolver;
use App\Http\Requests\GeneralSearchRequest;
use App\Http\Requests\Coa\StoreRequest;
use App\Http\Requests\Coa\UpdateRequest;
use App\Http\Resources\DefaultResource;
use App\Interfaces\Controllers\HasSearch;
use App\Interfaces\Services\Coa\CoaServiceInterface;
use App\Models\Coa;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\AllowedFilter;

class CoaController extends Controller implements HasSearch
{
    public function __construct(protected CoaServiceInterface $service)
    {
        parent::__construct();
    }

    public function search(): AnonymousResourceCollection
    {
        $datas = $this->service->findAllPaginate(
            $this->per_page,
            allowedFilters: [
                AllowedFilter::scope('where_parent'),
            ],
            allowedFields: ['id', 'name'],
        );

        return \App\Http\Resources\GeneralResource::collection($datas);
    }

    /**
     * Create new Coa.
     *
     * Creates new Coa or returns already existing Coa by email.
     */
    public function index(GeneralSearchRequest $request)
    {
        Gate::authorize('viewAny', Coa::class);

        $datas = $this->service->findAll(
            fn($q) => $q->whereParent()->with('childs'),
            allowedFilters: [
                AllowedFilter::exact('tenant_id'),
                AllowedFilter::exact('parent_id'),
            ],
            allowedIncludes: [
                'tenant',
                'parent',
            ],
            allowedFields: ['id', 'name'],
        );

        return Inertia::render('coas/index/index', [
            'datas' => DefaultResource::collection($datas),
            'filters' => [
                'search' => $request->filter['search'] ?? ""
            ],
            'page' => $request->page ?? 1,
            'per_page' => $this->per_page,
            'permission_actions' => PermissionResolver::forActions(Coa::class),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('create', Coa::class);

        return Inertia::render('coas/create/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        Gate::authorize('create', Coa::class);

        $this->service->create($request->validated());
        return to_route('coas.index')->with('success', self::CREATED_MESSAGE);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $coa = $this->service->findById($id);

        Gate::authorize('view', $coa);

        $coa->load([
            'tenant' => fn($q) => $q->selectMinimalist(),
            'parent' => fn($q) => $q->selectMinimalist(),
        ]);

        return Inertia::render('coas/show/index', [
            'data' => $coa,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $coa = $this->service->findById($id);

        Gate::authorize('update', $coa);

        $coa->load([
            'tenant' => fn($q) => $q->selectMinimalist(),
            'parent' => fn($q) => $q->selectMinimalist(),
        ]);

        return Inertia::render('coas/edit/index', [
            'data' => $coa
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, string $id)
    {
        $coa = $this->service->findById($id);

        Gate::authorize('update', $coa);

        $this->service->update($id, $request->validated());
        return to_route('coas.index')->with('success', self::UPDATED_MESSAGE);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $coa = $this->service->findById($id);

        Gate::authorize('delete', $coa);

        $this->service->delete($id);
        return redirect()->back()->with('success', self::DELETED_MESSAGE);
    }
}
