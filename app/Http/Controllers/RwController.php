<?php

namespace App\Http\Controllers;

use App\Helpers\Permission\PermissionResolver;
use App\Http\Requests\GeneralSearchRequest;
use App\Http\Requests\Rw\StoreRequest;
use App\Http\Resources\DefaultResource;
use App\Interfaces\Controllers\HasSearch;
use App\Interfaces\Services\Rw\RwServiceInterface;
use App\Models\Rw;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\AllowedFilter;

class RwController extends Controller implements HasSearch
{
    public function __construct(protected RwServiceInterface $service)
    {
        parent::__construct();
    }

    public function search(): AnonymousResourceCollection
    {
        $datas = $this->service->findAllPaginate(
            $this->per_page,
            fn($q) => $q->whereNull('parent_id')
        );

        return DefaultResource::collection($datas);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(GeneralSearchRequest $request): Response
    {
        Gate::authorize('viewAny', Rw::class);

        $datas = $this->service->findAllPaginate(
            $this->per_page,
            fn($q) => $q->with('leader'),
            [
                AllowedFilter::scope('search')
            ]
        );

        return Inertia::render('rw/index/index', [
            'datas' => DefaultResource::collection($datas),
            'filters' => [
                'search' => $request->filter['search'] ?? ""
            ],
            'page' => $request->page ?? 1,
            'per_page' => $this->per_page,
            'permission_actions' => PermissionResolver::forActions(Rw::class),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('create', Rw::class);

        return Inertia::render('rw/create/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        Gate::authorize('create', Rw::class);

        $this->service->create($request->validated());
        return to_route('rw.index')->with('success', self::CREATED_MESSAGE);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        Gate::authorize('view', Rw::class);

        $tenant = $this->service->findById($id, [
            'leader' => fn($q) => $q->selectMinimalist(),
            'createdBy' => fn($q) => $q->selectMinimalist(),
            'updatedBy' => fn($q) => $q->selectMinimalist(),
        ]);

        return Inertia::render('rw/show/index', [
            'data' => $tenant
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        Gate::authorize('update', Rw::class);

        $tenant = $this->service->findById($id);
        return Inertia::render('rw/edit/index', [
            'data' => $tenant
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRequest $request, string $id)
    {
        Gate::authorize('update', Rw::class);

        $this->service->update($id, $request->validated());
        return to_route('rw.index')->with('success', self::UPDATED_MESSAGE);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Gate::authorize('delete', Rw::class);

        $this->service->delete($id);
        return redirect()->back()->with('success', self::DELETED_MESSAGE);
    }
}
