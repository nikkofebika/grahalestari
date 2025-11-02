<?php

namespace App\Http\Controllers;

use App\Enums\NormalBalance;
use App\Http\Requests\Journal\JouralIndexRequest;
use App\Http\Resources\GeneralResource;
use App\Interfaces\Services\Coa\CoaServiceInterface;
use App\Models\Coa;
use App\Models\Journal;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class LedgerController extends Controller
{
    public function __construct(
        protected CoaServiceInterface $coaService,
    ) {
        parent::__construct();
    }

    public function index(JouralIndexRequest $request): Response
    {
        Gate::authorize('viewAny', Journal::class);

        $period = $request->filter['period'] ?? date('Y-m');

        $datas = $this->coaService->findAll(
            fn($q) => $q->selectMinimalist(['normal_balance'])
                ->when($request->filter['coa_id'], fn($q) => $q->where('id', $request->filter['coa_id']))
                ->whereParent(false)
                ->with([
                    'journalDetails' => fn($q) => $q->selectMinimalist()
                        ->whereHas('journal', fn($q) => $q->whereYearMonth($period))
                        ->with('journal', fn($q) => $q->selectMinimalist())
                ])
                ->orderBy('parent_id')
                ->orderBy('account_number'),
        )->map(function (Coa $coa) {
            $totalSaldo = 0;
            $totalDebit = 0;
            $totalCredit = 0;
            $coa->journalDetails->map(function ($journalDetail) use ($coa, &$totalSaldo, &$totalDebit, &$totalCredit) {
                if ($coa->normal_balance->is(NormalBalance::DEBIT->value)) {
                    $totalSaldo += $journalDetail->debit - $journalDetail->credit;
                } else {
                    $totalSaldo += $journalDetail->credit - $journalDetail->debit;
                }

                $journalDetail->saldo = formatNumber($totalSaldo);
                $totalDebit += $journalDetail->debit;
                $totalCredit += $journalDetail->credit;

                return $journalDetail;
            });

            $coa->total_debit = formatNumber($totalDebit);
            $coa->total_credit = formatNumber($totalCredit);
            $coa->total_saldo = formatNumber($totalSaldo);
            return $coa;
        });

        $coas = $this->coaService->getParentCoas();

        return Inertia::render('ledger/index/index', [
            'datas' => GeneralResource::collection($datas),
            'coas' => $coas,
            'filters' => [
                'period' => $request->filter['period'] ?? "",
                'coa_id' => $request->filter['coa_id'],
            ],
        ]);
    }
}
