<?php

namespace App\Http\Controllers;

use App\Enums\NormalBalance;
use App\Helpers\Permission\PermissionResolver;
use App\Http\Requests\Journal\JouralIndexRequest;
use App\Http\Requests\Journal\StoreRequest;
use App\Http\Requests\Journal\UpdateRequest;
use App\Http\Resources\Transaction\TransactionResource;
use App\Interfaces\Controllers\HasSearch;
use App\Interfaces\Services\Coa\CoaServiceInterface;
use App\Interfaces\Services\Journal\JournalServiceInterface;
use App\Models\Coa;
use App\Models\Journal;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\AllowedFilter;

class TransactionController extends Controller implements HasSearch
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

        $datas = $this->service->findAll(
            // $this->per_page,
            fn($q) => $q->with([
                'createdBy' => fn($q) => $q->selectMinimalist(),
                'details' => fn($q) => $q->with('coa', fn($q) => $q->selectMinimalist()),
                'detail' => fn($q) => $q->with('coa', fn($q) => $q->selectMinimalist()),
            ]),
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

        $total = formatNumber($datas->reduce(fn($carry, $journal) => $carry + ($journal->normal_balance->is(NormalBalance::CREDIT->value) ? $journal->amount : -$journal->amount), 0));

        $coas = $this->coaService->findAll(
            fn($q) => $q->select('id', 'account_number', 'account_name')
                ->whereNotNull('parent_id')
                ->orderBy('parent_id')
                ->orderBy('account_number'),
        )->map(function (Coa $coa) {
            return [
                'id' => $coa->id,
                'account_name' => $coa->account_number . ' - ' . $coa->account_name,
            ];
        });

        return Inertia::render('transactions/index/index', [
            'datas' => TransactionResource::collection($datas),
            'coas' => $coas,
            'filters' => [
                'period' => $request->filter['period'] ?? ""
            ],
            'page' => $request->page ?? 1,
            'per_page' => $this->per_page,
            'permission_actions' => PermissionResolver::forActions(Journal::class),
            'total' => $total,
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

        if ($normalBalance == NormalBalance::CREDIT->value) {
            $debitAccounts = $this->coaService->getKasAccounts();
            $creditAccounts = $this->coaService->getPendapatanAccounts();
        } else {
            $debitAccounts = $this->coaService->getBiayaAccounts();
            $creditAccounts = $this->coaService->getKasAccounts();
        }

        return Inertia::render('transactions/create/index', [
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
        return to_route('transactions.index')->with('success', self::CREATED_MESSAGE);
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
            'details' => fn($q) => $q->with('coa', fn($q) => $q->selectMinimalist()),
            'model.media',
            'media',
            'createdBy',
            'updatedBy',
        ]);

        return Inertia::render('transactions/show/index', [
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

        return Inertia::render('transactions/edit/index', [
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
        return to_route('transactions.index')->with('success', self::UPDATED_MESSAGE);
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
