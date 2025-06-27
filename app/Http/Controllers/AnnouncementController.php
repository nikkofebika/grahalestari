<?php

namespace App\Http\Controllers;

use App\Http\Requests\GeneralSearchRequest;
use App\Http\Requests\Announcement\StoreRequest;
use App\Interfaces\Controllers\HasSearch;
use App\Interfaces\Services\Announcement\AnnouncementServiceInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Inertia\Inertia;
use Inertia\Response;

class AnnouncementController extends Controller implements HasSearch
{
    public function __construct(protected AnnouncementServiceInterface $service)
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
    public function index(GeneralSearchRequest $request): Response
    {
        $datas = $this->service->findAllPaginate(
            $this->per_page,
            fn(Builder $q) => $q->with('user')
        );

        return Inertia::render('announcement/index/index', [
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
        return Inertia::render('announcement/create/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $this->service->create($request->validated());
        return to_route('pengumuman.index')->with('success', self::CREATED_MESSAGE);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $announcement = $this->service->findById($id, [
            'user' => fn($q) => $q->selectMinimalist()
        ]);
        return Inertia::render('announcement/show/index', [
            'data' => $announcement
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $announcement = $this->service->findById($id);
        return Inertia::render('announcement/edit/index', [
            'data' => $announcement
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRequest $request, string $id)
    {
        $this->service->update($id, $request->validated());
        return to_route('pengumuman.index')->with('success', self::UPDATED_MESSAGE);
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
