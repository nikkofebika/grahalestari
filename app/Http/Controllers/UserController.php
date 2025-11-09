<?php

namespace App\Http\Controllers;

use App\Exports\User\UsersExport;
use App\Helpers\Permission\PermissionResolver;
use App\Http\Requests\GeneralSearchRequest;
use App\Http\Requests\User\ExportRequest;
use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Http\Resources\DefaultResource;
use App\Interfaces\Controllers\HasSearch;
use App\Interfaces\Services\Rt\RtServiceInterface;
use App\Interfaces\Services\User\UserServiceInterface;
use App\Models\User;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\AllowedFilter;

class UserController extends Controller implements HasSearch
{
    public function __construct(
        protected UserServiceInterface $service,
        protected RtServiceInterface $rtService,
    ) {
        parent::__construct();
    }

    public function search(): AnonymousResourceCollection
    {
        $datas = $this->service->findAllPaginate(
            $this->per_page,
            allowedFilters: [
                AllowedFilter::scope('search'),
                AllowedFilter::scope('where_parent', 'whereParent'),
            ],
            allowedFields: ['id', 'name']
        );

        return \App\Http\Resources\GeneralResource::collection($datas);
    }

    public function index(GeneralSearchRequest $request)
    {
        Gate::authorize('viewAny', User::class);

        $datas = $this->service->findAllPaginate(
            $this->per_page,
            fn($q) => $q->with('tenant', fn($q) => $q->selectMinimalist()),
            [
                AllowedFilter::scope('search'),
                AllowedFilter::scope('where_parent', 'whereParent'),
            ],
            allowedFields: ['id', 'name']
        );


        $rts = $this->rtService->findAll(fn($q) => $q->select('id', 'name'));

        return Inertia::render('users/index/index', [
            'datas' => DefaultResource::collection($datas),
            'rts' => $rts,
            'filters' => [
                'search' => $request->filter['search'] ?? ""
            ],
            'page' => $request->page ?? 1,
            'per_page' => $this->per_page,
            'permission_actions' => PermissionResolver::forActions(User::class),
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', User::class);

        return Inertia::render('users/create/index');
    }

    public function store(StoreRequest $request)
    {
        Gate::authorize('create', User::class);

        $user = $this->service->create($request->validated());
        return to_route('users.show', $user)->with('success', self::CREATED_MESSAGE);
    }

    public function show(string $id): Response
    {
        $user = $this->service->findById($id);

        Gate::authorize('view', $user);

        $user->load([
            'group' => fn($q) => $q->selectMinimalist(),
            'tenant' => fn($q) => $q->selectMinimalist(),
            'detail',
            'image',
        ]);

        $familyMembers = $this->service->familyMembers($user);

        return Inertia::render('users/show/index', [
            'data' => $user,
            'family_members' => $familyMembers,
        ]);
    }

    public function edit(string $id)
    {
        $user = $this->service->findById($id);
        Gate::authorize('update', $user);

        $user->load([
            'group' => fn($q) => $q->selectMinimalist(),
            'tenant' => fn($q) => $q->selectMinimalist(),
            'detail',
            'image',
        ]);

        return Inertia::render('users/edit/index', [
            'data' => $user
        ]);
    }

    public function update(UpdateRequest $request, string $id)
    {
        $user = $this->service->findById($id);

        Gate::authorize('update', $user);

        $this->service->update($id, $request->validated());
        return to_route('users.show', $user)->with('success', self::UPDATED_MESSAGE);
    }

    public function destroy(string $id)
    {
        $user = $this->service->findById($id);

        Gate::authorize('delete', $user);

        $this->service->delete($id);
        return redirect()->back()->with('success', self::DELETED_MESSAGE);
    }

    public function export(ExportRequest $request)
    {
        return (new UsersExport(auth()->user(), $request->validated('tenant_id')))->download('warga.xlsx');
    }
}
