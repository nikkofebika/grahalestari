<?php

namespace App\Policies;

use App\Enums\UserType;
use App\Models\Rw;
use App\Models\User;

class RwPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->type->is(UserType::ADMIN_RW);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Rw $rw): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Rw $rw): bool
    {
        return $user->type->is(UserType::ADMIN_RW);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Rw $rw): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Rw $rw): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Rw $rw): bool
    {
        return false;
    }
}
