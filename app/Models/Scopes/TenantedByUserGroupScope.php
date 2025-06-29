<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class TenantedByUserGroupScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model): void
    {
        /** @var \App\Models\User */
        $user = auth()->user();

        if (!$user->is_god) {
            $builder->whereHas(
                'user',
                fn($q) => $q->where('group_id', $user->group_id)
            );
        }
    }
}
