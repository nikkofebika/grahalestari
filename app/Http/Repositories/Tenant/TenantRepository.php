<?php

namespace App\Http\Repositories\Tenant;

use App\Http\Repositories\BaseRepository;
use App\Interfaces\Repositories\Tenant\TenantRepositoryInterface;
use App\Models\Tenant;

class TenantRepository extends BaseRepository implements TenantRepositoryInterface
{
    public function __construct(Tenant $model)
    {
        parent::__construct($model);
    }
}
