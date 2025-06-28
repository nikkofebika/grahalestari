<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class TenantedByUserScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model): void
    {
        /** @var \App\Models\User */
        $user = auth()->user();

        if ($user->is_user_rw) {
            $builder->where(
                fn($q) => $q
                    ->whereHas('user', fn($q) => $q->where('tenant_id', $user->tenant_id))
                    ->orWhereHas('user', fn($q) => $q->whereHas('tenant', fn($q) => $q->where('parent_id', $user->tenant_id)))
            );
        }

        if ($user->is_user) {
            $builder->where('user_id', $user->id);
        }

        if ($user->is_admin_rt) {
            $builder->whereHas('user', fn($q) => $q->where('tenant_id', $user->tenant_id));
        }
    }
}
