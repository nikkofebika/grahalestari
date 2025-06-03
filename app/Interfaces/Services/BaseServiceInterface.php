<?php

namespace App\Interfaces\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

interface BaseServiceInterface
{
    public function findAll(): Collection;
    public function findById(int $id): ?Model;
    public function create(array $data): Model;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
    public function forceDelete(int $id): bool;
    public function restore(int $id): bool;
}
