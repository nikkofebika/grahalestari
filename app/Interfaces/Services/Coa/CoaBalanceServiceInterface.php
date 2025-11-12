<?php

namespace App\Interfaces\Services\Coa;

use App\Models\Coa;

interface CoaBalanceServiceInterface
{
    public function recalculate(Coa|int $coaId, string $year, string $month): void;
    public function recalculateAll(string $year, string $month): void;
}
