<?php

namespace App\Policies;

use App\Enums\UserType;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

abstract class BasePolicy
{
    public function belongsTo(User $user, Model $model, ?UserType $userType = null, string $modelColumn = 'user_id'): bool
    {
        $isTrue = true;
        if ($userType) {
            $isTrue = $user->type->is($userType);
        }

        if ($isTrue && $user->id != $model->{$modelColumn}) {
            return false;
        }

        return true;
    }
}
