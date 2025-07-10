<?php

namespace App\Http\Services\User;

use App\Http\Services\BaseService;
use App\Interfaces\Repositories\User\UserRepositoryInterface;
use App\Interfaces\Services\User\UserServiceInterface;
use App\Models\User;
use Exception;
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
}
