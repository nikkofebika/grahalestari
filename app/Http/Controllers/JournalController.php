<?php

namespace App\Http\Controllers;

use App\Enums\NormalBalance;
use App\Helpers\Permission\PermissionResolver;
use App\Http\Requests\Journal\JouralIndexRequest;
use App\Http\Requests\Journal\StoreRequest;
use App\Http\Requests\Journal\UpdateRequest;
use App\Http\Resources\DefaultResource;
use App\Interfaces\Controllers\HasSearch;
use App\Interfaces\Services\Coa\CoaServiceInterface;
use App\Interfaces\Services\Journal\JournalServiceInterface;
use App\Models\Journal;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\AllowedFilter;

class JournalController extends Controller implements HasSearch
{
    public function __construct(
        protected JournalServiceInterface $service,
        protected CoaServiceInterface $coaService,
    ) {
        parent::__construct();
    }

    public function search(): AnonymousResourceCollection
    {
        $datas = $this->service->findAllPaginate(
            $this->per_page,
            allowedFilters: [
                // AllowedFilter::scope('where_parent'),
            ],
            allowedFields: ['id', 'name'],
        );

        return \App\Http\Resources\GeneralResource::collection($datas);
    }

    /**
     * Create new Journal.
     *
     * Creates new Journal or returns already existing Journal by email.
     */
    public function index(JouralIndexRequest $request)
    {
        Gate::authorize('viewAny', Journal::class);

        $defaultPeriod = isset(request()->query('filter')['period']) ? null : date('Y-m');

        $datas = $this->service->findAll(
            fn($q) => $q->with([
                'createdBy' => fn($q) => $q->selectMinimalist(),
                'details' => fn($q) => $q->with('coa', fn($q) => $q->selectMinimalist()),
            ])->when($defaultPeriod, fn($q) => $q->whereYearMonth($defaultPeriod)),
            allowedFilters: [
                AllowedFilter::scope('period', 'whereYearMonth'),
                AllowedFilter::scope('coa_id', 'whereCoaId'),
            ],
            allowedIncludes: [
                'tenant',
                'createdBy',
                'updatedBy',
            ],
            allowedFields: ['id', 'name'],
        );

        $coas = $this->coaService->getParentCoas();

        return Inertia::render('journals/index/index', [
            'datas' => DefaultResource::collection($datas),
            'coas' => $coas,
            'filters' => [
                'period' => $request->filter['period'] ?? "",
                'coa_id' => $request->filter['coa_id'] ?? null
            ],
            'page' => $request->page ?? 1,
            'per_page' => $this->per_page,
            'permission_actions' => PermissionResolver::forActions(Journal::class),
            'total' => formatNumber($datas->sum('amount')),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(string $normalBalance): Response
    {
        if (!in_array($normalBalance, NormalBalance::getValues())) {
            abort(404);
        }

        Gate::authorize('create', Journal::class);

        if ($normalBalance == NormalBalance::CREDIT) {
            $debitAccounts = $this->coaService->getKasAccounts();
            $creditAccounts = $this->coaService->getPendapatanAccounts();
        } else {
            $debitAccounts = $this->coaService->getBiayaAccounts();
            $creditAccounts = $this->coaService->getKasAccounts();
        }

        return Inertia::render('journals/create/index', [
            'normal_balance' => $normalBalance,
            'debit_accounts' => $debitAccounts,
            'credit_accounts' => $creditAccounts,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request, string $normalBalance)
    {
        if (!in_array($normalBalance, NormalBalance::getValues())) {
            abort(404);
        }

        Gate::authorize('create', Journal::class);

        $this->service->createJournal($request->validated());
        return to_route('journals.index')->with('success', self::CREATED_MESSAGE);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $journal = $this->service->findById($id);

        Gate::authorize('view', $journal);

        $journal->load([
            'tenant' => fn($q) => $q->selectMinimalist(),
        ]);

        return Inertia::render('journals/show/index', [
            'data' => $journal,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $journal = $this->service->findById($id);

        Gate::authorize('update', $journal);

        $journal->load([
            'details' => fn($q) => $q->with('coa', fn($q) => $q->selectMinimalist()),
            'media'
        ]);

        if ($journal->normal_balance->is(NormalBalance::CREDIT)) {
            $debitAccounts = $this->coaService->getKasAccounts();
            $creditAccounts = $this->coaService->getPendapatanAccounts();
        } else {
            $debitAccounts = $this->coaService->getBiayaAccounts();
            $creditAccounts = $this->coaService->getKasAccounts();
        }

        // dd($journal->toArray());
        return Inertia::render('journals/edit/index', [
            'data' => $journal,
            'debit_accounts' => $debitAccounts,
            'credit_accounts' => $creditAccounts,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, string $id)
    {
        $journal = $this->service->findById($id);

        Gate::authorize('update', $journal);

        $this->service->update($id, $request->validated());
        return to_route('journals.index')->with('success', self::UPDATED_MESSAGE);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function forceDelete(string $id)
    {
        $journal = $this->service->findById($id);

        Gate::authorize('delete', $journal);

        $this->service->forceDelete($id);
        return redirect()->back()->with('success', self::DELETED_MESSAGE);
    }
}
