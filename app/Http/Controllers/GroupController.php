<?php

namespace App\Http\Controllers;

use App\Http\Requests\GeneralSearchRequest;
use App\Http\Requests\Group\StoreRequest;
use App\Interfaces\Services\Group\GroupServiceInterface;
use App\Models\Group;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GroupController extends Controller
{
    public function __construct(protected GroupServiceInterface $service)
    {
        parent::__construct();
    }

    public function getGroups(Request $request)
    {
        $search = $request->query('q', '');
        $groups = Group::where('name', 'like', "%{$search}%")
            ->select('id', 'name')
            ->paginate(10);
        return $groups;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(GeneralSearchRequest $request)
    {
        $datas = $this->service->findAllPaginate($this->per_page);

        return Inertia::render('groups/index', [
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
        return Inertia::render('groups/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $this->service->create($request->validated());
        return to_route('groups.index')->with('success', self::CREATED_MESSAGE);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $group = $this->service->findById($id);
        return Inertia::render('groups/show', [
            'group' => $group
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $group = $this->service->findById($id);
        return Inertia::render('groups/edit', [
            'group' => $group
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRequest $request, string $id)
    {
        $this->service->update($id, $request->validated());
        return to_route('groups.index')->with('success', self::UPDATED_MESSAGE);
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
