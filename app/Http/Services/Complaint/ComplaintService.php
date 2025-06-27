<?php

namespace App\Http\Services\Complaint;

use App\Http\Resources\DefaultResource;
use App\Http\Services\BaseService;
use App\Interfaces\Repositories\Complaint\ComplaintRepositoryInterface;
use App\Interfaces\Services\Complaint\ComplaintServiceInterface;
use App\Models\Complaint;
use Closure;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ComplaintService extends BaseService implements ComplaintServiceInterface
{
    public function __construct(protected ComplaintRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    public function findAllPaginate(int $perPage = 15, ?Closure $query = null, bool $isSimplePaginate = false): AnonymousResourceCollection
    {
        $datas = QueryBuilder::for(
            Complaint::query()->when($query, $query)
        )
            ->allowedFilters([
                AllowedFilter::scope('search')
            ])
            ->paginate($perPage)
            ->withQueryString();

        return DefaultResource::collection($datas);
    }
}
