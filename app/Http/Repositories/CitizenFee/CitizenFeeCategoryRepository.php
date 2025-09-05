<?php

namespace App\Http\Repositories\CitizenFee;

use App\Http\Repositories\BaseRepository;
use App\Interfaces\Repositories\CitizenFee\CitizenFeeCategoryRepositoryInterface;
use App\Models\CitizenFeeCategory;

class CitizenFeeCategoryRepository extends BaseRepository implements CitizenFeeCategoryRepositoryInterface
{
    public function __construct(CitizenFeeCategory $model)
    {
        parent::__construct($model);
    }
}
