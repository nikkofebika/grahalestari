<?php

namespace App\Http\Repositories\ProfitActivity;

use App\Http\Repositories\BaseRepository;
use App\Interfaces\Repositories\ProfitActivity\ProfitActivityCategoryRepositoryInterface;
use App\Models\ProfitActivityCategory;

class ProfitActivityCategoryRepository extends BaseRepository implements ProfitActivityCategoryRepositoryInterface
{
    public function __construct(ProfitActivityCategory $model)
    {
        parent::__construct($model);
    }
}
