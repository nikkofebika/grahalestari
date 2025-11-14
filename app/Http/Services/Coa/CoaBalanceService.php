<?php

namespace App\Http\Services\Coa;

use App\Interfaces\Services\Coa\CoaBalanceServiceInterface;
use App\Models\Coa;
use App\Models\CoaBalance;
use App\Models\Journal;
use Illuminate\Support\Facades\DB;

class CoaBalanceService implements CoaBalanceServiceInterface
{
    public function recalculate(Coa|int $coa, string $year, string $month): void
    {
        if (!($coa instanceof Coa)) {
            $coa = Coa::withoutglobalScopes()->select('id', 'parent_id')->find($coa);
        }

        // skip kalau parent_id bukan 1
        if (!$coa || $coa->parent_id !== 1) {
            return;
        }

        $openingBalance = $this->calculateOpeningBalance($coa->id, $year, $month);
        list($debit, $credit) = $this->calculateDebitCredit($coa->id, $year, $month);

        CoaBalance::upsert(
            [
                [
                    'coa_id' => $coa->id,
                    'period_month' => str_pad($month, 2, '0', STR_PAD_LEFT),
                    'period_year' => $year,
                    'opening_balance' => $openingBalance,
                    'debit' => $debit,
                    'credit' => $credit,
                ],
            ],
            uniqueBy: ['coa_id', 'period_month', 'period_year'],
            update: ['opening_balance', 'debit', 'credit']
        );
    }

    public function recalculateAll(string $year, string $month): void
    {
        $coas = Coa::where('parent_id', 1)->pluck('id');

        foreach ($coas as $coaId) {
            $this->recalculate($coaId, $year, $month);
        }
    }

    // private function recalculateAllPeriod(): void
    // {
    //     // ambil periode paling lama
    //     $oldest = CoaBalance::select('period_month', 'period_year')
    //         ->orderBy('period_year')
    //         ->orderBy('period_month')
    //         ->first();

    //     // ambil periode paling baru
    //     $latest = CoaBalance::select('period_month', 'period_year')
    //         ->orderBy('period_year', 'desc')
    //         ->orderBy('period_month', 'desc')
    //         ->first();

    //     if (!$oldest || !$latest) {
    //         return;
    //     }

    //     $startMonth = (int)$oldest->period_month;
    //     $startYear  = (int)$oldest->period_year;

    //     $endMonth = (int)$latest->period_month;
    //     $endYear  = (int)$latest->period_year;

    //     // semua akun yang ingin dihitung
    //     $coas = Coa::where('parent_id', 1)->pluck('id');

    //     // looping setiap bulan dari yg paling lama sampai terbaru
    //     while ($startYear < $endYear || ($startYear == $endYear && $startMonth <= $endMonth)) {

    //         foreach ($coas as $coaId) {
    //             $this->recalculate($coaId, (string)$startYear, str_pad($startMonth, 2, '0', STR_PAD_LEFT));
    //         }

    //         // naikkan bulan
    //         $startMonth++;
    //         if ($startMonth > 12) {
    //             $startMonth = 1;
    //             $startYear++;
    //         }
    //     }
    // }

    private function calculateOpeningBalance(int $coaId, string $year, string $month): int
    {
        $prevMonth = (int)$month - 1;
        $prevYear = $year;
        if ($prevMonth <= 0) {
            $prevMonth = 12;
            $prevYear = (int)$year - 1;
        }

        // ambil saldo akhir dari bulan sebelumnya
        $coaBalance = CoaBalance::where('coa_id', $coaId)
            ->where('period_year', $prevYear)
            ->where('period_month', str_pad($prevMonth, 2, '0', STR_PAD_LEFT))
            ->first();
        // ->value(DB::raw('(opening_balance + debit - credit)')) ?? 0;

        if ($coaBalance) {
            return $coaBalance->opening_balance + $coaBalance->debit - $coaBalance->credit;
        }

        $journal = Journal::withoutGlobalScopes()
            ->whereYear('transaction_date', $prevYear)
            ->whereMonth('transaction_date', $prevMonth)
            ->whereHas('details', fn($q) => $q->where('coa_id', $coaId))
            ->first();

        if ($journal) {
            $this->recalculate($coaId, $prevYear, $prevMonth);

            // ambil saldo bulan sebelumnya setelah dihitung
            $prevBalance = CoaBalance::where('coa_id', $coaId)
                ->where('period_year', $prevYear)
                ->where('period_month', str_pad($prevMonth, 2, '0', STR_PAD_LEFT))
                ->first();

            if ($prevBalance) {
                return $prevBalance->opening_balance + $prevBalance->debit - $prevBalance->credit;
            }
            // $this->recalculateAllPeriod();
        }

        return 0;
    }

    private function calculateDebitCredit(int $coaId, string $year, string $month): array
    {
        $period = $year . '-' . str_pad($month, 2, '0', STR_PAD_LEFT) . '-01';
        $coa = Coa::withoutGlobalScopes()
            ->select('id')
            ->whereId($coaId)
            ->withSum(['journalDetails as total_debit' => function ($q) use ($period) {
                $q->whereHas('journal', fn($jq) => $jq->withoutGlobalScopes()->whereYearMonth($period));
            }], 'debit')
            ->withSum(['journalDetails as total_credit' => function ($q) use ($period) {
                $q->whereHas('journal', fn($jq) => $jq->withoutGlobalScopes()->whereYearMonth($period));
            }], 'credit')
            ->firstOrFail();

        return [(int)$coa->total_debit, (int)$coa->total_credit];
    }
}
