<?php

namespace App\Interfaces\Repositories;

use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface BaseRepositoryInterface
{
    // public function findAllPaginate(): LengthAwarePaginator|Paginator;
    public function findAll(): Collection;
    public function findById(int $id, ?array $load = null): ?Model;
    public function create(array $data): Model;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
    public function forceDelete(int $id): bool;
    public function restore(int $id): bool;
}
