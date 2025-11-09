<?php

namespace App\Interfaces\Services\Coa;

use App\Interfaces\Services\BaseServiceInterface;
use Closure;
use Illuminate\Support\Collection;

interface CoaServiceInterface extends BaseServiceInterface
{
    public function getKasAccounts(): Collection;
    public function getPendapatanAccounts(): Collection;
    public function getBiayaAccounts(): Collection;
    public function getParentCoas(?Closure $query = null): Collection;
}
