<?php

namespace App\Traits\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

trait Tenanted
{
    use BelongsToTenant;

    public function scopeTenanted(Builder $query, ?User $user = null): void
    {
        if (!$user) {
            /** @var \App\Models\User */
            $user = auth()->user();
        }

        if (!$user->is_god) {
            if ($user->is_admin_rw) {
                $query->whereHas(
                    'tenant',
                    fn($q) => $q->withoutGlobalScope(self::class)
                        ->where('id', $user->group_id)
                        ->orWhere('parent_id', $user->group_id)
                );
            } else {
                $query->where('tenant_id', $user->tenant_id);
            }
        }
    }

    public function scopeFindTenanted(Builder $query, int|string $id, bool $fail = true): self
    {
        $query->tenanted()->where('id', $id);
        if ($fail) {
            return $query->firstOrFail();
        }

        return $query->first();
    }
}
