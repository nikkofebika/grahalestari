<?php

namespace App\Http\Repositories;

use App\Interfaces\Repositories\BaseRepositoryInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

abstract class BaseRepository implements BaseRepositoryInterface
{
    public function __construct(protected Model $model) {}

    protected function query(): Builder
    {
        return $this->model->newQuery();
    }

    public function findAll(): Collection
    {
        return $this->query()->get();
    }

    public function findById(int $id): ?Model
    {
        return $this->query()->find($id);
    }
    public function create(array $data): Model
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data): bool
    {
        return $this->query()->where('id', $id)->update($data);
    }

    public function delete(int $id): bool
    {
        return $this->query()->where('id', $id)->delete();
    }

    public function forceDelete(int $id): bool
    {
        return $this->query()->withTrashed()->where('id', $id)->forceDelete();
    }

    public function restore(int $id): bool
    {
        return $this->query()->withTrashed()->where('id', $id)->restore();
    }
}
