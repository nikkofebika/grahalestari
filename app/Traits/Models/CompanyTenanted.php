<?php

namespace App\Traits\Models;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait CompanyTenanted
{
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function scopeTenanted(Builder $query, ?User $user = null): Builder
    {
        if (!$user) {
            /** @var User $user */
            $user = auth()->user();
        }

        if ($user->is_super_admin) return $query;

        // if ($user->is_admin) {
        //     return $query->whereHas('company', fn($q) => $q->where('group_id', $user->group_id));
        // }

        return $query->where(fn($q) => $q->whereIn('company_id', $user->companies()->get(['company_id'])?->pluck('company_id')));
    }

    public function scopeFindTenanted(Builder $query, int|string $id, bool $fail = true): self
    {
        $query->tenanted()->where('id', $id);
        if ($fail) {
            return $query->firstOrFail();
        }

        return $query->first();
    }

    public function scopeWhereCompany(Builder $query, $companyId): Builder
    {
        return $query->tenanted()->where('company_id', $companyId);
    }
}
