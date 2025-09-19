<?php

namespace App\Interfaces\Services\CitizenFee;

use App\Interfaces\Services\BaseServiceInterface;
use App\Models\CitizenFee;

interface CitizenFeeDetailServiceInterface extends BaseServiceInterface
{
    public function customDelete(CitizenFee|int $citizenFee, int $userId): bool;
}
