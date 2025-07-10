<?php

namespace App\Http\Controllers;

use App\Helpers\Permission\PermissionResolver;
use App\Http\Requests\GeneralSearchRequest;
use App\Http\Requests\Complaint\StoreRequest;
use App\Http\Resources\DefaultResource;
use App\Interfaces\Controllers\HasSearch;
use App\Interfaces\Services\Complaint\ComplaintServiceInterface;
use App\Models\Complaint;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\AllowedFilter;

class ComplaintController extends Controller implements HasSearch
{
    public function __construct(protected ComplaintServiceInterface $service)
    {
        parent::__construct();
    }

    public function search(): AnonymousResourceCollection
    {
        $datas = $this->service->findAllPaginate($this->per_page);

        return DefaultResource::collection($datas);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(GeneralSearchRequest $request): Response
    {
        Gate::authorize('viewAny', Complaint::class);

        $datas = $this->service->findAllPaginate(
            $this->per_page,
            fn(Builder $q) => $q->with('user'),
            [
                AllowedFilter::scope('search')
            ]
        );

        return Inertia::render('complaint/index/index', [
            'datas' => DefaultResource::collection($datas),
            'filters' => [
                'search' => $request->filter['search'] ?? ""
            ],
            'page' => $request->page ?? 1,
            'per_page' => $this->per_page,
            'permission_actions' => PermissionResolver::forActions(Complaint::class),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('create', Complaint::class);

        return Inertia::render('complaint/create/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        Gate::authorize('create', Complaint::class);

        $this->service->create($request->validated());
        return to_route('aduan-masyarakat.index')->with('success', self::CREATED_MESSAGE);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $complaint = $this->service->findById($id, [
            'user' => fn($q) => $q->selectMinimalist()
        ]);

        Gate::authorize('view', $complaint);

        return Inertia::render('complaint/show/index', [
            'data' => $complaint
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $complaint = $this->service->findById($id, ['user.tenant']);

        Gate::authorize('update', $complaint);

        return Inertia::render('complaint/edit/index', [
            'data' => $complaint
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRequest $request, string $id)
    {
        $complaint = $this->service->findById($id);

        Gate::authorize('update', $complaint);

        $this->service->update($id, $request->validated());
        return to_route('aduan-masyarakat.index')->with('success', self::UPDATED_MESSAGE);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $complaint = $this->service->findById($id);

        Gate::authorize('delete', $complaint);

        $this->service->delete($id);
        return redirect()->back()->with('success', self::DELETED_MESSAGE);
    }
}
