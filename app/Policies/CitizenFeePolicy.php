<?php

namespace App\Policies;

use App\Models\CitizenFee;
use App\Models\User;

class CitizenFeePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, CitizenFee $CitizenFee): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return !$user->is_user;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, CitizenFee $CitizenFee): bool
    {
        return !$user->is_user;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, CitizenFee $CitizenFee): bool
    {
        return !$user->is_user;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, CitizenFee $CitizenFee): bool
    {
        return !$user->is_user;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, CitizenFee $CitizenFee): bool
    {
        return !$user->is_user;
    }
}
