<?php

namespace App\Http\Services\User;

use App\Http\Services\BaseService;
use App\Interfaces\Services\User\UserServiceInterface;
use App\Models\User;

class UserService extends BaseService implements UserServiceInterface
{
    public function __construct(protected User $user)
    {
        parent::__construct($user);
    }
}
