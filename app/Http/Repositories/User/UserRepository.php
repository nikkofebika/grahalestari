<?php

namespace App\Http\Repositories\User;

use App\Http\Repositories\BaseRepository;
use App\Interfaces\Repositories\User\UserRepositoryInterface;
use App\Models\User;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    public function findById(int $id): ?User
    {
        return $this->query()
            ->with([
                'group' => fn($q) => $q->select('id', 'name')
            ])
            ->find($id);
    }
}
