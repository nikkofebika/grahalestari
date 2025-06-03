<?php

namespace App\Http\Services;

use App\Http\Repositories\BaseRepository;
use App\Interfaces\Services\BaseServiceInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

abstract class BaseService implements BaseServiceInterface
{
    public function __construct(protected BaseRepository $repository) {}

    public function findAll(): Collection
    {
        return $this->repository->findAll();
    }

    public function findById(int $id): ?Model
    {
        return $this->repository->findById($id);
    }

    public function create(array $data): Model
    {
        return $this->repository->create($data);
    }

    public function update(int $id, array $data): bool
    {
        return $this->repository->update($id, $data);
    }

    public function delete(int $id): bool
    {
        return $this->repository->delete($id);
    }

    public function forceDelete(int $id): bool
    {
        return $this->repository->forceDelete($id);
    }

    public function restore(int $id): bool
    {
        return $this->repository->restore($id);
    }
}
