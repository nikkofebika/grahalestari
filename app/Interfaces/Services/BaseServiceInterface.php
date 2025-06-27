<?php

namespace App\Interfaces\Services;

use Closure;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Collection;

interface BaseServiceInterface
{
    public function findAllPaginate(int $perPage, ?Closure $query = null, bool $isSimplePaginate = false): AnonymousResourceCollection;
    public function findAll(): Collection;
    public function findById(int $id, ?array $load = []): ?Model;
    public function create(array $data): Model;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
    public function forceDelete(int $id): bool;
    public function restore(int $id): bool;
}
