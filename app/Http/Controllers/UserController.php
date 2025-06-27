<?php

namespace App\Http\Controllers;

use App\Http\Requests\GeneralSearchRequest;
use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Interfaces\Controllers\HasSearch;
use App\Interfaces\Services\User\UserServiceInterface;
use App\Models\User;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller implements HasSearch
{
    public function __construct(protected UserServiceInterface $service)
    {
        parent::__construct();
    }

    public function search(): AnonymousResourceCollection
    {
        return $this->service->findAllPaginate($this->per_page);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(GeneralSearchRequest $request)
    {
        Gate::authorize('viewAny', User::class);

        $datas = $this->service->findAllPaginate($this->per_page);

        return Inertia::render('users/index', [
            'datas' => $datas,
            'filters' => [
                'search' => $request->filter['search'] ?? ""
            ],
            'page' => $request->page ?? 1,
            'per_page' => $this->per_page
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('users/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        dd($request->validated());
        $this->service->create($request->validated());
        return to_route('users.index')->with('success', self::CREATED_MESSAGE);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $user = $this->service->findById($id);
        return Inertia::render('users/show', [
            'user' => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = $this->service->findById($id);
        $user->load('detail');
        return Inertia::render('users/edit', [
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, string $id)
    {
        $this->service->update($id, $request->validated());
        return to_route('users.index')->with('success', self::UPDATED_MESSAGE);
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
