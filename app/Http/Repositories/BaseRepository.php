<?php

namespace App\Http\Repositories;

use App\Interfaces\Repositories\BaseRepositoryInterface;
use Closure;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;

abstract class BaseRepository implements BaseRepositoryInterface
{
    public function __construct(protected Model $model) {}

    protected function query(): Builder
    {
        return $this->model->newQuery();
    }

    public function findAllPaginate(int $perPage = 15, ?Closure $query = null, ?array $allowedFilters = [], ?array $allowedIncludes = [], ?array $allowedFields = [], ?array $allowedSorts = [], bool $isSimplePaginate = false): LengthAwarePaginator|Paginator
    {
        $query = QueryBuilder::for(
            $this->model->query()->when($query, $query)
        );

        if (count($allowedFields)) {
            $query->allowedFields($allowedFields);
        }

        if (count($allowedFilters)) {
            $query->allowedFilters($allowedFilters);
        }

        if (count($allowedIncludes)) {
            $query->allowedIncludes($allowedIncludes);
        }

        if (count($allowedSorts)) {
            $query->allowedSorts($allowedSorts);
        }

        if ($isSimplePaginate) {
            return $query->simplePaginate($perPage)->withQueryString();
        }

        return $query->paginate($perPage)->withQueryString();
    }

    public function findAll(): Collection
    {
        return $this->query()->get();
    }

    public function findById(int $id, ?array $load = []): ?Model
    {
        $data = $this->query()->find($id);

        if ($data && count($load)) {
            $data = $data->load($load);
        }

        return $data;
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
