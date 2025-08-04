<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class TenantedScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model): void
    {
        /** @var \App\Models\User */
        $user = auth()->user();

        if (!$user->is_god) {
            if ($user->is_admin_rw) {
                $builder->where(
                    fn($q) => $q->whereHas(
                        'tenant',
                        fn($q) => $q->withoutGlobalScope(self::class)
                            ->where('id', $user->group_id)
                            ->orWhere('parent_id', $user->group_id)
                    )
                );
            } else {
                $builder->where('tenant_id', $user->tenant_id);
            }
        }
    }
}
