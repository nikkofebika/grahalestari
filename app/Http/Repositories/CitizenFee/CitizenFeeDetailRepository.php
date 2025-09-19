<?php

namespace App\Http\Repositories\CitizenFee;

use App\Http\Repositories\BaseRepository;
use App\Interfaces\Repositories\CitizenFee\CitizenFeeDetailRepositoryInterface;
use App\Models\CitizenFeeDetail;

class CitizenFeeDetailRepository extends BaseRepository implements CitizenFeeDetailRepositoryInterface
{
    public function __construct(CitizenFeeDetail $model)
    {
        parent::__construct($model);
    }
}
