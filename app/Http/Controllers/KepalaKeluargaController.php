<?php

namespace App\Http\Controllers;

use App\Enums\UserType;
use App\Exports\User\UsersGroupByKK;
use App\Helpers\Permission\PermissionResolver;
use App\Http\Requests\GeneralSearchRequest;
use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Http\Resources\DefaultResource;
use App\Interfaces\Controllers\HasSearch;
use App\Interfaces\Services\User\UserServiceInterface;
use App\Models\User;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\AllowedFilter;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class KepalaKeluargaController extends Controller implements HasSearch
{
    public function __construct(protected UserServiceInterface $service)
    {
        parent::__construct();
    }

    public function search(): AnonymousResourceCollection
    {
        $datas = $this->service->findAllPaginate($this->per_page, fn($q) => $q->where('type', '!=', UserType::GOD));

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
            fn($q) => $q->where('type', '!=', UserType::GOD)
                ->whereNull('parent_id')
                ->with([
                    'detail',
                    'tenant' => fn($q) => $q->selectMinimalist(),
                ]),
            [
                AllowedFilter::scope('search')
            ],
            allowedFields: ['id', 'name']
        );

        return Inertia::render('kepala-keluarga/index/index', [
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

        return Inertia::render('kepala-keluarga/create/index');
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
    public function show(string $id): Response|RedirectResponse
    {
        $user = $this->service->findById($id, fn($q) => $q->with('detail'));
        abort_if(!$user, 404);

        if ($user->parent_id) {
            return redirect()->route('kepala-keluarga.index')->with('error', "$user->name bukan kepala keluarga");
        }

        Gate::authorize('view', $user);

        $familyMembers = $this->service->familyMembers($user);

        return Inertia::render('kepala-keluarga/show/index', [
            'data' => $user,
            'family_members' => $familyMembers,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(string $id)
    // {
    //     $user = $this->service->findById($id);

    //     Gate::authorize('update', $user);

    //     $user->load([
    //         'group' => fn($q) => $q->selectMinimalist(),
    //         'tenant' => fn($q) => $q->selectMinimalist(),
    //         'detail',
    //     ]);

    //     return Inertia::render('kepala-keluarga/edit/index', [
    //         'data' => $user
    //     ]);
    // }

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

        DB::beginTransaction();
        try {
            $this->service->delete($id);
            User::where('parent_id', $id)->delete();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }

        return redirect()->back()->with('success', self::DELETED_MESSAGE);
    }

    public function deleteMember(string $id, string $memberId)
    {
        $user = $this->service->findById($id);

        Gate::authorize('delete', $user);

        $child = $this->service->findById($memberId);
        if ($user->id !== $child->parent_id) {
            return redirect()->back()->with('error', $child->name . ' bukan anggota keluarga ' . $user->name);
        }

        $child->update(['parent_id' => null]);

        return redirect()->back()->with('success', self::DELETED_MESSAGE);
    }

    public function export(?string $id = null)
    {
        return (new UsersGroupByKK($id))->download('users-group-by-kk.xlsx');
        // return (new UsersGroupByKK)->download('users-group-by-kk.csv', \Maatwebsite\Excel\Excel::CSV, ['Content-Type' => 'text/csv']);
    }
}
