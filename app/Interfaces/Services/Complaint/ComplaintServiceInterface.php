<?php

namespace App\Interfaces\Services\Complaint;

use App\Interfaces\Services\BaseServiceInterface;
use App\Models\Complaint;

interface ComplaintServiceInterface extends BaseServiceInterface
{
    public function handle(Complaint $complaint, array $data): bool;
}
