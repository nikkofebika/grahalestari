<?php

namespace App\Http\Controllers;

use App\Helpers\Permission\PermissionResolver;
use App\Http\Requests\GeneralSearchRequest;
use App\Http\Requests\CitizenFeeDetail\StoreRequest;
use App\Http\Resources\DefaultResource;
use App\Interfaces\Services\CitizenFee\CitizenFeeDetailServiceInterface;
use App\Interfaces\Services\CitizenFee\CitizenFeeServiceInterface;
use App\Interfaces\Services\User\UserServiceInterface;
use App\Models\CitizenFee;
use App\Models\CitizenFeeDetail;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\AllowedFilter;

class CitizenFeeDetailController extends Controller
{
    public function __construct(
        protected CitizenFeeDetailServiceInterface $service,
        protected CitizenFeeServiceInterface $citizenFeeService,
        protected UserServiceInterface $userService
    ) {
        parent::__construct();
    }

    public function index(GeneralSearchRequest $request, int $citizenFeeId)
    {
        Gate::authorize('viewAny', CitizenFee::class);

        $citizenFee = $this->citizenFeeService->findById($citizenFeeId, load: ['category']);
        if (!$citizenFee) {
            abort(404);
        }

        $datas = $this->userService->findAllPaginate(
            $this->per_page,
            fn($q) => $q->selectMinimalist()->where('tenant_id', $citizenFee->category->tenant_id)->with('citizenFeeDetail', fn($q) => $q->where('citizen_fee_id', $citizenFeeId)),
            [
                AllowedFilter::scope('search')
            ],
            allowedFields: ['id', 'name']
        );

        return Inertia::render('citizen-fees/details/index/index', [
            'datas' => DefaultResource::collection($datas),
            'citizen_fee' => $citizenFee,
            'filters' => [
                'search' => $request->filter['search'] ?? ""
            ],
            'page' => $request->page ?? 1,
            'per_page' => $this->per_page,
            'permission_actions' => PermissionResolver::forActions(CitizenFeeDetail::class),
        ]);
    }

    // public function create(): Response
    // {
    //     Gate::authorize('create', CitizenFee::class);

    //     return Inertia::render('citizen-fees/details/create/index');
    // }

    public function store(StoreRequest $request)
    {
        Gate::authorize('create', CitizenFee::class);

        $this->service->create($request->validated());
        return redirect()->back()->with('success', self::CREATED_MESSAGE);
    }

    public function show(int $citizenFeeId, int $userId): Response
    {
        $citizenFee = $this->citizenFeeService->findById($citizenFeeId, load: ['category']);
        if (!$citizenFee) {
            abort(404);
        }

        Gate::authorize('view', $citizenFee);

        $user = $this->userService->findById($userId);
        if (!$user) {
            abort(404);
        }

        $user->load([
            'tenant' => fn($q) => $q->selectMinimalist(),
            'citizenFeeDetail' => fn($q) => $q
                ->where('citizen_fee_id', $citizenFeeId)
                ->with([
                    'createdBy' => fn($q) => $q->selectMinimalist(),
                    'updatedBy' => fn($q) => $q->selectMinimalist(),
                ])
        ]);

        return Inertia::render('citizen-fees/details/show/index', [
            'user' => $user,
            'citizen_fee' => $citizenFee,
        ]);
    }

    // public function edit(string $id)
    // {
    //     $citizenFeeDetail = $this->service->findById($id);

    //     Gate::authorize('update', $citizenFeeDetail);

    //     $citizenFeeDetail->load([
    //         'category' => fn($q) => $q->selectMinimalist(['tenant_id', 'fix_amount'])->with('tenant', fn($q) => $q->selectMinimalist()),
    //     ]);

    //     return Inertia::render('citizen-fees/details/edit/index', [
    //         'data' => $citizenFeeDetail
    //     ]);
    // }

    // public function update(StoreRequest $request, string $id)
    // {
    //     $citizenFeeDetail = $this->service->findById($id);

    //     Gate::authorize('update', $citizenFeeDetail);

    //     $this->service->update($id, $request->validated());
    //     return to_route('iuran-warga.index')->with('success', self::UPDATED_MESSAGE);
    // }

    public function destroy(int $citizenFeeId, int $userId)
    {
        $citizenFee = $this->citizenFeeService->findById($citizenFeeId, fn($q) => $q->select('id'));
        if (!$citizenFee) {
            abort(404);
        }

        Gate::authorize('delete', $citizenFee);

        if ($this->service->customDelete($citizenFee, $userId)) {
            return redirect()->back()->with('success', self::DELETED_MESSAGE);
        }

        return redirect()->back()->with(self::ERROR_SESSION_KEY, 'Data tidak ditemukan');
    }
}
