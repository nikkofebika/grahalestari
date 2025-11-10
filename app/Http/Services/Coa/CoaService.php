<?php

namespace App\Http\Services\Coa;

use App\Http\Services\BaseService;
use App\Interfaces\Repositories\Coa\CoaRepositoryInterface;
use App\Interfaces\Services\Coa\CoaServiceInterface;
use App\Models\Coa;
use Closure;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class CoaService extends BaseService implements CoaServiceInterface
{
    public function __construct(protected CoaRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    public function create(array $data): Coa
    {
        return DB::transaction(function () use ($data) {
            $coa = $this->baseRepository->create($data);
            $coa->coaBalances()->create();
            return $coa;
        });
    }

    public function getKasAccounts(): Collection
    {
        return $this->repository->findAll(
            fn($q) => $q->where('parent_id', 1)
        );
    }

    public function getPendapatanAccounts(): Collection
    {
        return $this->repository->findAll(
            fn($q) => $q->where('parent_id', 2)
        );
    }

    public function getBiayaAccounts(): Collection
    {
        return $this->repository->findAll(
            fn($q) => $q->where('parent_id', 3)
        );
    }

    public function getParentCoas(?Closure $query = null): Collection
    {
        return $this->findAll(
            fn($q) => $q->select('id', 'account_number', 'account_name')
                ->whereParent(false)
                ->when($query, $query)
                ->orderBy('parent_id')
                ->orderBy('account_number'),
        )->map(function (Coa $coa) {
            return [
                'id' => $coa->id,
                'account_name' => $coa->account_number . ' - ' . $coa->account_name,
            ];
        });
    }
}
