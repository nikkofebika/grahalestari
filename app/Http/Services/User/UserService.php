<?php

namespace App\Http\Services\User;

use App\Http\Resources\DefaultResource;
use App\Http\Services\BaseService;
use App\Interfaces\Repositories\User\UserRepositoryInterface;
use App\Interfaces\Services\User\UserServiceInterface;
use App\Models\User;
use Closure;
use Exception;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedInclude;
use Spatie\QueryBuilder\QueryBuilder;

class UserService extends BaseService implements UserServiceInterface
{
    public function __construct(protected UserRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    public function findAllPaginate(int $perPage = 15, ?Closure $query = null, bool $isSimplePaginate = false): AnonymousResourceCollection
    {
        $datas = QueryBuilder::for(
            User::tenanted()->when($query, $query)
        )
            ->allowedFields(['id', 'name'])
            ->allowedIncludes([
                AllowedInclude::callback('tenant', fn($q) => $q->selectMinimalist())
            ])
            ->allowedFilters([
                AllowedFilter::scope('search')
            ])
            ->paginate($perPage)
            ->withQueryString();

        return DefaultResource::collection($datas);
    }

    public function findById(int $id, ?array $load = []): ?User
    {
        return $this->baseRepository->findById($id, $load);
    }

    public function create(array $data): User
    {
        DB::beginTransaction();
        try {
            /** @var User */
            $user = $this->baseRepository->create($data);
            $user->detail()->create($data);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }

        return $user;
    }

    public function update(int $id, array $data): bool
    {
        if (empty($data['password'])) unset($data['password']);

        return $this->baseRepository->update($id, $data);
    }
}
