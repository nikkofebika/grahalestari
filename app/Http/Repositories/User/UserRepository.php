<?php

namespace App\Http\Repositories\User;

use App\Http\Repositories\BaseRepository;
use App\Interfaces\Repositories\User\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    protected function query(): Builder
    {
        return $this->model->newQuery()->tenanted();
    }

    public function findById(int $id, ?\Closure $query = null, ?array $load = []): ?User
    {
        $data = $this->query()
            ->when($query, $query)
            ->with([
                'tenant' => fn($q) => $q->select('id', 'name')
            ])
            ->find($id);

        if (count($load)) {
            $data = $data->load($load);
        }

        return $data;
    }
}
