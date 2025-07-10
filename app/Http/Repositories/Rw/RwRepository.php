<?php

namespace App\Http\Repositories\Rw;

use App\Http\Repositories\BaseRepository;
use App\Interfaces\Repositories\Rw\RwRepositoryInterface;
use App\Models\Rw;

class RwRepository extends BaseRepository implements RwRepositoryInterface
{
    public function __construct(Rw $model)
    {
        parent::__construct($model);
    }
}
