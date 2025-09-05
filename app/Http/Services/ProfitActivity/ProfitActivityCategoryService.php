<?php

namespace App\Http\Services\ProfitActivity;

use App\Http\Services\BaseService;
use App\Interfaces\Repositories\ProfitActivity\ProfitActivityCategoryRepositoryInterface;
use App\Interfaces\Services\ProfitActivity\ProfitActivityCategoryServiceInterface;

class ProfitActivityCategoryService extends BaseService implements ProfitActivityCategoryServiceInterface
{
    public function __construct(protected ProfitActivityCategoryRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }
}
