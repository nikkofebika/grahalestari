<?php

namespace App\Http\Repositories\ProfitActivity;

use App\Http\Repositories\BaseRepository;
use App\Interfaces\Repositories\ProfitActivity\ProfitActivityRepositoryInterface;
use App\Models\ProfitActivity;

class ProfitActivityRepository extends BaseRepository implements ProfitActivityRepositoryInterface
{
    public function __construct(ProfitActivity $model)
    {
        parent::__construct($model);
    }
}
