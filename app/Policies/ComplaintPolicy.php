<?php

namespace App\Policies;

use App\Enums\UserType;
use App\Models\Complaint;
use App\Models\User;

class ComplaintPolicy
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
    public function view(User $user, Complaint $complaint): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Complaint $complaint): bool
    {
        if ($user->type->is(UserType::USER) && $user->id != $complaint->user_id) {
            return false;
        }

        return true;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Complaint $complaint): bool
    {
        if ($user->type->is(UserType::USER) && $user->id != $complaint->user_id) {
            return false;
        }

        return true;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Complaint $complaint): bool
    {
        if ($user->type->is(UserType::USER) && $user->id != $complaint->user_id) {
            return false;
        }

        return true;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Complaint $complaint): bool
    {
        if ($user->type->is(UserType::USER) && $user->id != $complaint->user_id) {
            return false;
        }

        return true;
    }
}
