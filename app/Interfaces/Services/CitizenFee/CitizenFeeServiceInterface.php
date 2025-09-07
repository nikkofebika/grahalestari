<?php

namespace App\Interfaces\Services\CitizenFee;

use App\Interfaces\Services\BaseServiceInterface;
use App\Models\CitizenFee;

interface CitizenFeeServiceInterface extends BaseServiceInterface
{
    public function updateStatus(CitizenFee|int $citizenFee, array $data): bool;
}
