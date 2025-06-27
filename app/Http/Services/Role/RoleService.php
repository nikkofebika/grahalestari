<?php

namespace App\Http\Services\Role;

use App\Http\Services\BaseService;
use App\Interfaces\Repositories\Role\RoleRepositoryInterface;
use App\Interfaces\Services\Role\RoleServiceInterface;

class RoleService extends BaseService implements RoleServiceInterface
{
    public function __construct(protected RoleRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }
}
