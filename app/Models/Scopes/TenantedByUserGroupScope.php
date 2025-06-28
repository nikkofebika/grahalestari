<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class TenantedByUserTenantScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model): void
    {
        /** @var \App\Models\User */
        $user = auth()->user();

        if ($user->is_admin_rw) {
            $builder->where(
                fn($q) => $q->whereHas(
                    'user',
                    fn($q) => $q->where('tenant_id', $user->tenant_id)
                        ->orWhereHas(
                            'tenant',
                            fn($q) => $q->withoutGlobalScopes()
                                ->where('parent_id', $user->tenant_id)
                        )
                )
            );
        } elseif ($user->is_admin_rt) {
            $builder->where(
                fn($q) => $q->whereHas(
                    'user',
                    fn($q) => $q->where('tenant_id', $user->tenant_id)
                        ->orWhereHas(
                            'tenant',
                            fn($q) => $q->withoutGlobalScopes()
                                ->where('parent_id', $user->tenant_id)
                                ->orWhereHas('childs', fn($q) => $q->where('id', $user->tenant_id))
                        )
                )
            );
        } elseif (!$user->is_god) {
            $builder->whereHas('user', fn($q) => $q->where('tenant_id', $user->tenant_id));
        }
    }
}
