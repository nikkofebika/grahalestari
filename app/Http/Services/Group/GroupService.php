<?php

namespace App\Http\Services\Group;

use App\Http\Resources\Group\GroupResource;
use App\Http\Services\BaseService;
use App\Interfaces\Repositories\Group\GroupRepositoryInterface;
use App\Interfaces\Services\Group\GroupServiceInterface;
use App\Models\Group;
use Closure;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class GroupService extends BaseService implements GroupServiceInterface
{
    public function __construct(protected GroupRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    public function findAllPaginate(int $perPage = 15, ?Closure $query = null, bool $isSimplePaginate = false): AnonymousResourceCollection
    {
        $datas = QueryBuilder::for(
            Group::query()->when($query, $query)
        )
            ->allowedFilters([
                AllowedFilter::scope('search')
            ])
            ->paginate($perPage)
            ->withQueryString();

        return GroupResource::collection($datas);
    }
}
