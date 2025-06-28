<?php

namespace App\Policies;

use App\Enums\UserType;
use App\Models\Tenant;
use App\Models\User;

class TenantPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAnyRw(User $user): bool
    {
        return $user->type->is(UserType::ADMIN_RW);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function viewRw(User $user, Tenant $tenant): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function createRw(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function updateRw(User $user, Tenant $tenant): bool
    {
        return $user->type->is(UserType::ADMIN_RW);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function deleteRw(User $user, Tenant $tenant): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restoreRw(User $user, Tenant $tenant): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDeleteRw(User $user, Tenant $tenant): bool
    {
        return false;
    }

    /**
     * the policies from here is FOR RT
     */

    /**
     * Determine whether the user can view any models.
     */
    public function viewAnyRt(User $user): bool
    {
        return !$user->type->is(UserType::USER);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function viewRt(User $user, Tenant $tenant): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function createRt(User $user): bool
    {
        return $user->type->is(UserType::ADMIN_RW);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function updateRt(User $user, Tenant $tenant): bool
    {
        return !$user->type->is(UserType::USER);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function deleteRt(User $user, Tenant $tenant): bool
    {
        return $user->type->is(UserType::ADMIN_RW);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restoreRt(User $user, Tenant $tenant): bool
    {
        return $user->type->is(UserType::ADMIN_RW);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDeleteRt(User $user, Tenant $tenant): bool
    {
        return $user->type->is(UserType::ADMIN_RW);
    }
}
