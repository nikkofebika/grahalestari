<?php

namespace App\Http\Controllers;

use App\Enums\NormalBalance;
use App\Http\Requests\Journal\JouralIndexRequest;
use App\Http\Resources\GeneralResource;
use App\Interfaces\Services\Coa\CoaServiceInterface;
use App\Interfaces\Services\Journal\JournalServiceInterface;
use App\Models\Coa;
use Inertia\Inertia;

class LaporanKeuanganController extends Controller
{
    public function __construct(
        private CoaServiceInterface $coaService,
        protected JournalServiceInterface $service
    ) {}

    public function index(JouralIndexRequest $request)
    {
        // Gate::authorize('viewAny', LaporanKeuangan::class);
        $period = $request->filter['period'] ?? date('Y-m');

        $datas = $this->coaService->findAll(
            fn($q) => $q->selectMinimalist(['normal_balance'])
                // ->whereIn('id', [2, 3])
                ->whereNull('parent_id')
                ->orderBy('parent_id')
                ->orderBy('account_number')
                ->with(
                    'childs',
                    fn($q) => $q->selectMinimalist(['normal_balance'])
                        ->withSum(['journalDetails as total_debit' => function ($q) use ($period) {
                            $q->whereHas('journal', fn($jq) => $jq->whereYearMonth($period));
                        }], 'debit')
                        ->withSum(['journalDetails as total_credit' => function ($q) use ($period) {
                            $q->whereHas('journal', fn($jq) => $jq->whereYearMonth($period));
                        }], 'credit')
                        ->when($request->filter['coa_id'], fn($q) => $q->where('id', $request->filter['coa_id']))
                        ->whereHas('journalDetails', fn($q) => $q->whereHas('journal', fn($q) => $q->whereYearMonth($period)))
                ),
        )->map(function (Coa $parentCoa) {
            $sumTotalSaldo = 0;

            $parentCoa->childs->map(function (Coa $coa) use (&$sumTotalSaldo) {
                $totalDebit = (int)$coa->total_debit;
                $totalCredit = (int)$coa->total_credit;

                if ($coa->normal_balance->is(NormalBalance::DEBIT->value)) {
                    $totalSaldo = $totalDebit - $totalCredit;
                } else {
                    $totalSaldo = $totalCredit - $totalDebit;
                }

                $sumTotalSaldo += $totalSaldo;

                $coa->total_saldo = formatNumber($totalSaldo);
                return $coa;
            });

            $parentCoa->total_saldo = formatNumber($sumTotalSaldo);

            return $parentCoa;
        });

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

        $totalPosisiKeuangan = 0;
        $posisiKeuangan = $this->coaService->findAll(
            fn($q) => $q->selectMinimalist(['normal_balance'])
                ->where('id', 1)
                ->with(
                    'childs',
                    fn($q) => $q->selectMinimalist(['normal_balance'])
                        ->withSum(['journalDetails as total_debit' => function ($q) use ($period) {
                            $q->whereHas('journal', fn($jq) => $jq->whereYearMonth($period));
                        }], 'debit')
                        ->withSum(['journalDetails as total_credit' => function ($q) use ($period) {
                            $q->whereHas('journal', fn($jq) => $jq->whereYearMonth($period));
                        }], 'credit')
                        ->when($request->filter['coa_id'], fn($q) => $q->where('id', $request->filter['coa_id']))
                        ->whereHas('journalDetails', fn($q) => $q->whereHas('journal', fn($q) => $q->whereYearMonth($period)))
                ),
        )->map(function (Coa $parentCoa) use (&$totalPosisiKeuangan) {
            $sumTotalSaldo = 0;

            $parentCoa->childs->map(function (Coa $coa) use (&$sumTotalSaldo) {
                $totalDebit = (int)$coa->total_debit;
                $totalCredit = (int)$coa->total_credit;

                if ($coa->normal_balance->is(NormalBalance::DEBIT->value)) {
                    $totalSaldo = $totalDebit - $totalCredit;
                } else {
                    $totalSaldo = $totalCredit - $totalDebit;
                }

                $sumTotalSaldo += $totalSaldo;

                $coa->total_saldo = formatNumber($totalSaldo);
                return $coa;
            });

            $totalPosisiKeuangan += $sumTotalSaldo;

            $parentCoa->total_saldo = formatNumber($sumTotalSaldo);

            return $parentCoa;
        });
        $totalPosisiKeuangan = formatNumber($totalPosisiKeuangan);

        $tribal = $this->coaService->findAll(
            fn($q) => $q->selectMinimalist(['normal_balance'])
                ->whereNotNull('parent_id')
                ->orderBy('parent_id')
                ->orderBy('account_number')
                ->withSum(['journalDetails as total_debit' => function ($q) use ($period) {
                    $q->whereHas('journal', fn($jq) => $jq->whereYearMonth($period));
                }], 'debit')
                ->withSum(['journalDetails as total_credit' => function ($q) use ($period) {
                    $q->whereHas('journal', fn($jq) => $jq->whereYearMonth($period));
                }], 'credit')
                ->whereHas('journalDetails', fn($q) => $q->whereHas('journal', fn($q) => $q->whereYearMonth($period)))
        )
            ->map(function (Coa $coa) {
                $totalDebit = (int)$coa->total_debit;
                $totalCredit = (int)$coa->total_credit;

                if ($coa->normal_balance->is(NormalBalance::DEBIT->value)) {
                    $totalSaldo = $totalDebit - $totalCredit;
                } else {
                    $totalSaldo = $totalCredit - $totalDebit;
                }

                $coa->total_debit = formatNumber($totalDebit);
                $coa->total_credit = formatNumber($totalCredit);
                $coa->total_saldo = formatNumber($totalSaldo);
                return $coa;
            });

        return Inertia::render('laporan-keuangan/index/index', [
            'datas' => GeneralResource::collection($datas),
            'posisi_keuangan' => [
                'total' => $totalPosisiKeuangan,
                'datas' => GeneralResource::collection($posisiKeuangan),
            ],
            'tribal' => [
                'datas' => GeneralResource::collection($tribal),
            ],
            'coas' => $coas,
            'filters' => [
                'period' => $request->filter['period'] ?? "",
                'coa_id' => $request->filter['coa_id'],
            ],
        ]);
    }
}
