<?php

namespace App\Http\Services\Rw;

use App\Http\Services\BaseService;
use App\Interfaces\Repositories\Rw\RwRepositoryInterface;
use App\Interfaces\Services\Rw\RwServiceInterface;

class RwService extends BaseService implements RwServiceInterface
{
    public function __construct(protected RwRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }
}
