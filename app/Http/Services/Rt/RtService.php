<?php

namespace App\Http\Services\Rt;

use App\Http\Services\BaseService;
use App\Interfaces\Repositories\Rt\RtRepositoryInterface;
use App\Interfaces\Services\Rt\RtServiceInterface;

class RtService extends BaseService implements RtServiceInterface
{
    public function __construct(protected RtRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }
}
