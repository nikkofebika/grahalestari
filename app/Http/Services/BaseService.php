<?php

namespace App\Http\Services;

use App\Interfaces\Repositories\BaseRepositoryInterface;
use App\Interfaces\Services\BaseServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

abstract class BaseService implements BaseServiceInterface
{
    public function __construct(protected BaseRepositoryInterface $baseRepository) {}

    public function findAllPaginate(int $perPage = 15, ?\Closure $query = null, ?array $allowedFilters = [], ?array $allowedIncludes = [], ?array $allowedFields = [], ?array $allowedSorts = [], bool $isSimplePaginate = false): LengthAwarePaginator|Paginator
    {
        return $this->baseRepository->findAllPaginate($perPage, $query, $allowedFilters, $allowedIncludes, $allowedFields, $allowedSorts, $isSimplePaginate);
    }

    public function findAll(): Collection
    {
        return $this->baseRepository->findAll();
    }

    public function findById(int $id, ?array $load = []): ?Model
    {
        return $this->baseRepository->findById($id, $load);
    }

    public function create(array $data): Model
    {
        return $this->baseRepository->create($data);
    }

    public function update(int $id, array $data): bool
    {
        return $this->baseRepository->update($id, $data);
    }

    public function delete(int $id): bool
    {
        return $this->baseRepository->delete($id);
    }

    public function forceDelete(int $id): bool
    {
        return $this->baseRepository->forceDelete($id);
    }

    public function restore(int $id): bool
    {
        return $this->baseRepository->restore($id);
    }
}
