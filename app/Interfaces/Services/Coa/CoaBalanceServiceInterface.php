<?php

namespace App\Interfaces\Services\Coa;

use App\Interfaces\Services\BaseServiceInterface;

interface CoaBalanceServiceInterface extends BaseServiceInterface
{
    public function recalculate(int $coaId, string $year, string $month): void;
}
