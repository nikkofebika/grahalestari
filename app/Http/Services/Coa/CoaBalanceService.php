<?php

namespace App\Http\Services\Coa;

use App\Http\Services\BaseService;
use App\Models\CoaBalance;
use Closure;
use Illuminate\Support\Collection;

// class CoaBalanceService extends BaseService implements CoaBalanceServiceInterface
class CoaBalanceService extends BaseService
{
    // public function __construct(protected CoaBalanceRepositoryInterface $repository)
    // {
    //     parent::__construct($repository);
    // }

    public function getParentCoaBalances(?Closure $query = null): Collection
    {
        return $this->findAll(
            fn($q) => $q->select('id', 'account_number', 'account_name')
                ->whereParent(false)
                ->when($query, $query)
                ->orderBy('parent_id')
                ->orderBy('account_number'),
        )->map(function (CoaBalance $coaBalance) {
            return [
                'id' => $coaBalance->id,
                'account_name' => $coaBalance->account_number . ' - ' . $coaBalance->account_name,
            ];
        });
    }
}
