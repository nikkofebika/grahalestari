<?php

namespace App\Http\Controllers;

use App\Helpers\Permission\PermissionResolver;
use App\Http\Requests\GeneralSearchRequest;
use App\Http\Requests\Rt\StoreRequest;
use App\Http\Resources\DefaultResource;
use App\Interfaces\Controllers\HasSearch;
use App\Interfaces\Services\Tenant\TenantServiceInterface;
use App\Models\Tenant;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\AllowedFilter;

class RtController extends Controller implements HasSearch
{
    public function __construct(protected TenantServiceInterface $service)
    {
        parent::__construct();
    }

    public function search(): AnonymousResourceCollection
    {
        $datas = $this->service->findAllPaginate(
            $this->per_page,
            fn($q) => $q->whereNotNull('parent_id')
        );

        return DefaultResource::collection($datas);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(GeneralSearchRequest $request): Response
    {
        Gate::authorize('viewAnyRt', Tenant::class);

        // $data = Tenant::query()->paginate();
        // /** @var Paginator */
        // $data2 = Tenant::query()->simplePaginate();
        // $data2->getCollection();

        $datas = $this->service->findAllPaginate(
            $this->per_page,
            fn($q) => $q->whereNotNull('parent_id')->with('leader'),
            [AllowedFilter::scope('search')]
        );

        return Inertia::render('rt/index/index', [
            'permissions' => [
                'collection' => PermissionResolver::forCollection($datas->getCollection(), ['viewRt', 'updateRt', 'deleteRt']),
                'actions' => PermissionResolver::forActions(Tenant::class, ['createRt']),
            ],
            'datas' => DefaultResource::collection($datas),
            'filters' => [
                'search' => $request->filter['search'] ?? ""
            ],
            'page' => $request->page ?? 1,
            'per_page' => $this->per_page,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('createRt', Tenant::class);

        return Inertia::render('rt/create/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        Gate::authorize('createRt', Tenant::class);

        $this->service->create($request->validated());
        return to_route('rt.index')->with('success', self::CREATED_MESSAGE);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $tenant = $this->service->findById($id, [
            'parent.leader',
            'leader' => fn($q) => $q->selectMinimalist(),
            'createdBy' => fn($q) => $q->selectMinimalist(),
            'updatedBy' => fn($q) => $q->selectMinimalist(),
        ]);

        Gate::authorize('viewRt', $tenant);

        return Inertia::render('rt/show/index', [
            'data' => $tenant
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $tenant = $this->service->findById($id);

        Gate::authorize('updateRt', $tenant);

        return Inertia::render('rt/edit/index', [
            'data' => $tenant
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRequest $request, string $id)
    {
        $tenant = $this->service->findById($id);

        Gate::authorize('updateRt', $tenant);

        $this->service->update($id, $request->validated());
        return to_route('rt.index')->with('success', self::UPDATED_MESSAGE);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tenant = $this->service->findById($id);

        Gate::authorize('deleteRt', $tenant);

        $this->service->delete($id);
        return redirect()->back()->with('success', self::DELETED_MESSAGE);
    }
}
