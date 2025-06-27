<?php

namespace App\Http\Services\Announcement;

use App\Http\Resources\DefaultResource;
use App\Http\Services\BaseService;
use App\Interfaces\Repositories\Announcement\AnnouncementRepositoryInterface;
use App\Interfaces\Services\Announcement\AnnouncementServiceInterface;
use App\Models\Announcement;
use Closure;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class AnnouncementService extends BaseService implements AnnouncementServiceInterface
{
    public function __construct(protected AnnouncementRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    public function findAllPaginate(int $perPage = 15, ?Closure $query = null, bool $isSimplePaginate = false): AnonymousResourceCollection
    {
        $datas = QueryBuilder::for(
            Announcement::query()->when($query, $query)
        )
            ->allowedFilters([
                AllowedFilter::scope('search')
            ])
            ->paginate($perPage)
            ->withQueryString();

        return DefaultResource::collection($datas);
    }
}
