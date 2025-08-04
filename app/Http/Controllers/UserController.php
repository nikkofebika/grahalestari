<?php

namespace App\Http\Controllers;

use App\Helpers\Permission\PermissionResolver;
use App\Http\Requests\GeneralSearchRequest;
use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Http\Resources\DefaultResource;
use App\Interfaces\Controllers\HasSearch;
use App\Interfaces\Services\User\UserServiceInterface;
use App\Models\User;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\AllowedFilter;

class UserController extends Controller implements HasSearch
{
    public function __construct(protected UserServiceInterface $service)
    {
        parent::__construct();
    }

    public function search(): AnonymousResourceCollection
    {
        $datas = $this->service->findAllPaginate(
            $this->per_page,
            allowedFields: ['id', 'name']
        );

        return \App\Http\Resources\GeneralResource::collection($datas);
    }

    /**
     * Create new user.
     *
     * Creates new user or returns already existing user by email.
     */
    public function index(GeneralSearchRequest $request)
    {
        Gate::authorize('viewAny', User::class);

        $datas = $this->service->findAllPaginate(
            $this->per_page,
            fn($q) => $q->with('tenant', fn($q) => $q->selectMinimalist()),
            [
                AllowedFilter::scope('search')
            ],
            allowedFields: ['id', 'name']
        );

        return Inertia::render('users/index/index', [
            'datas' => DefaultResource::collection($datas),
            'filters' => [
                'search' => $request->filter['search'] ?? ""
            ],
            'page' => $request->page ?? 1,
            'per_page' => $this->per_page,
            'permission_actions' => PermissionResolver::forActions(User::class),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('create', User::class);

        return Inertia::render('users/create/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        Gate::authorize('create', User::class);

        $this->service->create($request->validated());
        return to_route('users.index')->with('success', self::CREATED_MESSAGE);
    }

    /**
     * Display the specified resource.
     */
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

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = $this->service->findById($id);

        Gate::authorize('update', $user);

        $user->load([
            'group' => fn($q) => $q->selectMinimalist(),
            'tenant' => fn($q) => $q->selectMinimalist(),
            'detail',
        ]);

        return Inertia::render('users/edit/index', [
            'data' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, string $id)
    {
        $user = $this->service->findById($id);

        Gate::authorize('update', $user);

        $this->service->update($id, $request->validated());
        return to_route('users.index')->with('success', self::UPDATED_MESSAGE);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = $this->service->findById($id);

        Gate::authorize('delete', $user);

        $this->service->delete($id);
        return redirect()->back()->with('success', self::DELETED_MESSAGE);
    }
}
