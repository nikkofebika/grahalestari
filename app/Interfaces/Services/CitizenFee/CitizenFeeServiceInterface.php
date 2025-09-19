<?php

namespace App\Interfaces\Services\CitizenFee;

use App\Interfaces\Services\BaseServiceInterface;
use App\Models\CitizenFee;

interface CitizenFeeServiceInterface extends BaseServiceInterface
{
    public function refreshJournal(CitizenFee|int $citizenFee): void;
    // public function updateStatus(CitizenFee|int $citizenFee, array $data): bool;
}
