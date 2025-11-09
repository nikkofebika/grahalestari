<?php

namespace App\Http\Controllers;

use App\Helpers\Permission\PermissionResolver;
use App\Http\Requests\Complaint\HandleRequest;
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

        return \App\Http\Resources\GeneralResource::collection($datas);
    }

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

    public function create(): Response
    {
        Gate::authorize('create', Complaint::class);

        return Inertia::render('complaint/create/index');
    }

    public function store(StoreRequest $request)
    {
        Gate::authorize('create', Complaint::class);

        $this->service->create($request->validated());
        return to_route('aduan-masyarakat.index')->with('success', self::CREATED_MESSAGE);
    }

    public function show(string $id): Response
    {
        $complaint = $this->service->findById($id, load: [
            'user' => fn($q) => $q->selectMinimalist(),
            'handledBy' => fn($q) => $q->selectMinimalist(),
            'doneBy' => fn($q) => $q->selectMinimalist(),
        ]);

        Gate::authorize('view', $complaint);

        return Inertia::render('complaint/show/index', [
            'data' => $complaint
        ]);
    }

    public function edit(string $id)
    {
        $complaint = $this->service->findById($id, load: ['user.tenant']);

        Gate::authorize('update', $complaint);

        return Inertia::render('complaint/edit/index', [
            'data' => $complaint
        ]);
    }

    public function update(StoreRequest $request, string $id)
    {
        $complaint = $this->service->findById($id);

        Gate::authorize('update', $complaint);

        $this->service->update($id, $request->validated());
        return to_route('aduan-masyarakat.index')->with('success', self::UPDATED_MESSAGE);
    }

    public function destroy(string $id)
    {
        $complaint = $this->service->findById($id);

        Gate::authorize('delete', $complaint);

        $this->service->delete($id);
        return redirect()->back()->with('success', self::DELETED_MESSAGE);
    }
    public function handle(HandleRequest $request, string $id)
    {
        $complaint = $this->service->findById($id);

        Gate::authorize('handle', $complaint);

        $this->service->handle($complaint, $request->validated());

        return redirect()->back()->with('success', "Aduan berhasil " . ($request->status === "done" ? "diselesaikan" : "ditangani"));
    }
}
