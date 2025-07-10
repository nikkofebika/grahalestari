<?php

namespace App\Http\Controllers;

use App\Helpers\Permission\PermissionResolver;
use App\Http\Requests\GeneralSearchRequest;
use App\Http\Requests\Tenant\StoreRequest;
use App\Http\Resources\DefaultResource;
use App\Interfaces\Services\Tenant\TenantServiceInterface;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TenantController extends Controller
{
    public function __construct(protected TenantServiceInterface $service)
    {
        parent::__construct();
    }

    public function getTenants(Request $request)
    {
        $search = $request->query('q', '');
        $tenants = Tenant::where('name', 'like', "%{$search}%")
            ->select('id', 'name')
            ->paginate(10);
        return $tenants;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(GeneralSearchRequest $request)
    {
        $datas = $this->service->findAllPaginate($this->per_page);

        return Inertia::render('tenants/index', [
            'datas' => DefaultResource::collection($datas),
            'filters' => [
                'search' => $request->filter['search'] ?? ""
            ],
            'page' => $request->page ?? 1,
            'per_page' => $this->per_page,
            'permission_actions' => PermissionResolver::forActions(Tenant::class),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('tenants/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $this->service->create($request->validated());
        return to_route('tenants.index')->with('success', self::CREATED_MESSAGE);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $tenant = $this->service->findById($id);
        return Inertia::render('tenants/show', [
            'tenant' => $tenant
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $tenant = $this->service->findById($id);
        return Inertia::render('tenants/edit', [
            'tenant' => $tenant
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRequest $request, string $id)
    {
        $this->service->update($id, $request->validated());
        return to_route('tenants.index')->with('success', self::UPDATED_MESSAGE);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->service->delete($id);
        return redirect()->back()->with('success', self::DELETED_MESSAGE);
    }
}
