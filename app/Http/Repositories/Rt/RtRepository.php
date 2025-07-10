<?php

namespace App\Http\Repositories\Rt;

use App\Http\Repositories\BaseRepository;
use App\Interfaces\Repositories\Rt\RtRepositoryInterface;
use App\Models\Rt;

class RtRepository extends BaseRepository implements RtRepositoryInterface
{
    public function __construct(Rt $model)
    {
        parent::__construct($model);
    }
}
