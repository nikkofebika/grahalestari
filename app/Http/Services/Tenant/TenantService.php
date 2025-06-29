<?php

namespace App\Http\Services\Tenant;

use App\Http\Resources\Tenant\TenantResource;
use App\Http\Services\BaseService;
use App\Interfaces\Repositories\Tenant\TenantRepositoryInterface;
use App\Interfaces\Services\Tenant\TenantServiceInterface;
use App\Models\Tenant;
use Closure;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class TenantService extends BaseService implements TenantServiceInterface
{
    public function __construct(protected TenantRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    public function findAllPaginate(int $perPage = 15, ?Closure $query = null, bool $isSimplePaginate = false): AnonymousResourceCollection
    {
        $datas = QueryBuilder::for(
            Tenant::query()->when($query, $query)
        )
            ->allowedFilters([
                AllowedFilter::scope('search')
            ])
            ->paginate($perPage)
            ->withQueryString();

        return TenantResource::collection($datas);
    }
}
