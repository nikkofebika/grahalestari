<?php

namespace App\Interfaces\Services\User;

use App\Interfaces\Services\BaseServiceInterface;
use App\Models\User;
use Illuminate\Support\Collection;

interface UserServiceInterface extends BaseServiceInterface
{
    public function familyMembers(User $user): Collection;
}
