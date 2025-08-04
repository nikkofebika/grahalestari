<?php

namespace App\Http\Services\User;

use App\Http\Services\BaseService;
use App\Interfaces\Repositories\User\UserRepositoryInterface;
use App\Interfaces\Services\User\UserServiceInterface;
use App\Models\User;
use Exception;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class UserService extends BaseService implements UserServiceInterface
{
    public function __construct(protected UserRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    public function create(array $data): User
    {
        DB::beginTransaction();
        try {
            /** @var User */
            $user = $this->baseRepository->create($data);

            if (isset($data['image']) && $data['image']->isValid()) {
                $user->addMedia($data['image'])->toMediaCollection();
            }

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

        $user = $this->findById($id);

        try {
            /** @var User */
            // $this->baseRepository->update($id, $data);
            $user->update($data);
            $user->detail->update($data);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }

        return true;
    }

    public function familyMembers(User $user): Collection
    {
        $users = collect();
        $query = User::select('users.id', 'users.name')
            ->with('detail', fn($q) => $q->select('user_details.user_id', 'user_details.no_kk', 'user_details.no_ktp', 'user_details.birth_date', 'user_details.birth_place', 'user_details.birth_place', 'user_details.gender', 'user_details.religion', 'user_details.marital_status', 'user_details.education', 'user_details.job'))
            ->join('user_details', 'users.id', '=', 'user_details.user_id')
            ->orderBy('user_details.birth_date', 'desc');

        if ($user->parent_id) {
            $parent = $user->parent;
            $users->push($parent);

            $members = $query
                ->where('parent_id', $parent->id)
                ->get();
        } else {
            $users->push($user);

            $members = $query
                ->where('parent_id', $user->id)
                ->get();
        }

        $users->push(...$members);

        return $users;
    }
}
