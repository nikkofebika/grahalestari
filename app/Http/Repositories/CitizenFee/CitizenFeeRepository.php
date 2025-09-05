<?php

namespace App\Http\Repositories\CitizenFee;

use App\Http\Repositories\BaseRepository;
use App\Interfaces\Repositories\CitizenFee\CitizenFeeRepositoryInterface;
use App\Models\CitizenFee;

class CitizenFeeRepository extends BaseRepository implements CitizenFeeRepositoryInterface
{
    public function __construct(CitizenFee $model)
    {
        parent::__construct($model);
    }
}
