<?php

namespace App\Http\Services\Tenant;

use App\Http\Services\BaseService;
use App\Interfaces\Repositories\Tenant\TenantRepositoryInterface;
use App\Interfaces\Services\Tenant\TenantServiceInterface;

class TenantService extends BaseService implements TenantServiceInterface
{
    public function __construct(protected TenantRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }
}
