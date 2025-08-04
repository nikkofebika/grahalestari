<?php

namespace App\Interfaces\Services\Coa;

use App\Interfaces\Services\BaseServiceInterface;
use Illuminate\Support\Collection;

interface CoaServiceInterface extends BaseServiceInterface
{
    public function getKasAccounts(): Collection;
    public function getPendapatanAccounts(): Collection;
    public function getBiayaAccounts(): Collection;
}
