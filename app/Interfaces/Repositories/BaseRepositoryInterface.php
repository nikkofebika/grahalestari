<?php

namespace App\Interfaces\Repositories;

use Closure;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;

interface BaseRepositoryInterface
{

    /**
     * Get all paginated data with optional query modifications.
     *
     * @param int $perPage Number of items per page
     * @param Closure|null $query Optional closure to modify query
     * @param array $allowedFilters Allowed filters for query builder
     * @param array $allowedIncludes Allowed includes for query builder
     * @param array $allowedFields Allowed fields for query builder
     * @param array $allowedSorts Allowed sorts for query builder
     * @param bool $isSimplePaginate Whether to use simple pagination
     *
     * @return LengthAwarePaginator|Paginator
     */
    public function findAllPaginate(int $perPage = 15, ?Closure $query = null, ?array $allowedFilters = [], ?array $allowedIncludes = [], ?array $allowedFields = [], ?array $allowedSorts = [],  bool $isSimplePaginate = false): LengthAwarePaginator|Paginator;
    public function findAll(?Closure $query = null, ?array $allowedFilters = [], ?array $allowedIncludes = [], ?array $allowedFields = [], ?array $allowedSorts = []): Collection;
    public function findById(int $id, ?Closure $query = null, ?array $load = []): ?Model;
    public function create(array $data): Model;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
    public function forceDelete(int $id): bool;
    public function restore(int $id): bool;
}
