<?php

namespace App\Http\Services\Coa;

use App\Http\Services\BaseService;
use App\Interfaces\Services\Coa\CoaBalanceServiceInterface;
use App\Models\CoaBalance;

class CoaBalanceService extends BaseService implements CoaBalanceServiceInterface
{
    public function recalculate(int $coaId, string $year, string $month): void
    {
        $openingBalance = $this->calculateOpeningBalance($coaId, $year, $month);
        $debit = $this->calculateDebit($coaId, $year, $month);
        $credit = $this->calculateCredit($coaId, $year, $month);

        CoaBalance::upsert(
            [
                [
                    'coa_id' => $coaId,
                    'period_month' => $month,
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

    protected function calculateOpeningBalance(int $coaId, string $year, string $month): int
    {
        // ambil saldo akhir dari bulan sebelumnya
        return CoaBalance::where('coa_id', $coaId)
            ->where(function ($q) use ($year, $month) {
                $prevMonth = (int)$month - 1;
                $prevYear = $year;
                if ($prevMonth <= 0) {
                    $prevMonth = 12;
                    $prevYear = (int)$year - 1;
                }
                $q->where('period_year', $prevYear)
                    ->where('period_month', str_pad($prevMonth, 2, '0', STR_PAD_LEFT));
            })
            ->value(\DB::raw('(opening_balance + debit - credit)')) ?? 0;
    }

    protected function calculateDebit(int $coaId, string $year, string $month): int
    {
        // nanti ambil total debit dari journals bulan ini
        return 0;
    }

    protected function calculateCredit(int $coaId, string $year, string $month): int
    {
        // nanti ambil total credit dari journals bulan ini
        return 0;
    }
}
