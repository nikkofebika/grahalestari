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

class TribalController extends Controller
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
                ->whereParent()
                ->with(
                    'childs',
                    fn($q) => $q->selectMinimalist(['normal_balance'])
                        ->withSum(['journalDetails as total_debit' => function ($q) use ($period) {
                            $q->whereHas('journal', fn($jq) => $jq->whereYearMonth($period));
                        }], 'debit')
                        ->withSum(['journalDetails as total_credit' => function ($q) use ($period) {
                            $q->whereHas('journal', fn($jq) => $jq->whereYearMonth($period));
                        }], 'credit')
                ),
        )
            ->map(function (Coa $parentCoa) {
                $sumTotalDebit = 0;
                $sumTotalCredit = 0;
                $sumTotalSaldo = 0;

                $parentCoa->childs->map(function (Coa $coa) use (&$sumTotalDebit, &$sumTotalCredit, &$sumTotalSaldo) {
                    $totalDebit = (int)$coa->total_debit;
                    $totalCredit = (int)$coa->total_credit;

                    $sumTotalDebit += $totalDebit;
                    $sumTotalCredit += $totalCredit;

                    if ($coa->normal_balance->is(NormalBalance::DEBIT->value)) {
                        $totalSaldo = $totalDebit - $totalCredit;
                    } else {
                        $totalSaldo = $totalCredit - $totalDebit;
                    }

                    $sumTotalSaldo += $totalSaldo;

                    $coa->total_debit = formatNumber($totalDebit);
                    $coa->total_credit = formatNumber($totalCredit);
                    $coa->total_saldo = formatNumber($totalSaldo);
                    return $coa;
                });

                $parentCoa->total_debit = formatNumber($sumTotalDebit);
                $parentCoa->total_credit = formatNumber($sumTotalCredit);
                $parentCoa->total_saldo = formatNumber($sumTotalSaldo);

                return $parentCoa;
            });

        return Inertia::render('tribal/index/index', [
            'datas' => GeneralResource::collection($datas),
            'filters' => [
                'period' => $request->filter['period'] ?? ""
            ],
        ]);
    }
}
