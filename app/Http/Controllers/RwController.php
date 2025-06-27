<?php

namespace App\Http\Controllers;

use App\Http\Requests\GeneralSearchRequest;
use App\Http\Requests\Rw\StoreRequest;
use App\Interfaces\Controllers\HasSearch;
use App\Interfaces\Services\Group\GroupServiceInterface;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Inertia\Inertia;
use Inertia\Response;

class RwController extends Controller implements HasSearch
{
    public function __construct(protected GroupServiceInterface $service)
    {
        parent::__construct();
    }

    public function search(): AnonymousResourceCollection
    {
        return $this->service->findAllPaginate(
            $this->per_page,
            fn($q) => $q->whereNull('parent_id')
        );
    }

    /**
     * Display a listing of the resource.
     */
    public function index(GeneralSearchRequest $request): Response
    {
        $datas = $this->service->findAllPaginate(
            $this->per_page,
            fn($q) => $q->whereNull('parent_id')
                ->with('leader')
        );

        return Inertia::render('rw/index', [
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
        return Inertia::render('rw/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $this->service->create($request->validated());
        return to_route('rw.index')->with('success', self::CREATED_MESSAGE);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $group = $this->service->findById($id, [
            'leader' => fn($q) => $q->selectMinimalist(),
            'createdBy' => fn($q) => $q->selectMinimalist(),
            'updatedBy' => fn($q) => $q->selectMinimalist(),
        ]);

        return Inertia::render('rw/show', [
            'data' => $group
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $group = $this->service->findById($id);
        return Inertia::render('rw/edit', [
            'data' => $group
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRequest $request, string $id)
    {
        $this->service->update($id, $request->validated());
        return to_route('rw.index')->with('success', self::UPDATED_MESSAGE);
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
