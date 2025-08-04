<?php

namespace App\Http\Repositories\Coa;

use App\Http\Repositories\BaseRepository;
use App\Interfaces\Repositories\Coa\CoaRepositoryInterface;
use App\Models\Coa;

class CoaRepository extends BaseRepository implements CoaRepositoryInterface
{
    public function __construct(Coa $model)
    {
        parent::__construct($model);
    }

    // protected function query(): Builder
    // {
    //     return $this->model->newQuery()->tenanted();
    // }

    public function delete(int $id): bool
    {
        $model = $this->findById($id, fn($q) => $q->whereParent(false));
        return $model->delete();
    }
}
