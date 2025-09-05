<?php

namespace App\Http\Services\CitizenFee;

use App\Http\Services\BaseService;
use App\Interfaces\Repositories\CitizenFee\CitizenFeeCategoryRepositoryInterface;
use App\Interfaces\Services\CitizenFee\CitizenFeeCategoryServiceInterface;

class CitizenFeeCategoryService extends BaseService implements CitizenFeeCategoryServiceInterface
{
    public function __construct(protected CitizenFeeCategoryRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }
}
