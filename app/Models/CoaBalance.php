<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CoaBalance extends BaseModel
{
    protected $fillable = [
        'coa_id',
        'period_month',
        'period_year',
        'opening_balance',
        'debit',
        'credit',
    ];

    protected $appends = [
        'closing_balance',
    ];

    public function getClosingBalanceAttribute(): int
    {
        return $this->opening_balance + $this->debit - $this->credit;
    }

    public function scopeTenanted(Builder $query)
    {
        /** @var \App\Models\User */
        $user = auth()->user();

        // this is copied from \App\Models\Scopes\TenantedScope::class
        // because can not call $coa->tenanted()
        if (!$user->is_god) {
            if ($user->is_admin_rw) {
                $fn = fn($q) => $q->whereHas(
                    'tenant',
                    fn($q) => $q->withoutGlobalScope(self::class)
                        ->where('id', $user->group_id)
                        ->orWhere('parent_id', $user->group_id)
                );
            } else {
                $fn = fn($q) => $q->where('tenant_id', $user->tenant_id);
            }

            $query->whereHas('coa', $fn);
        }
    }

    public function coa(): BelongsTo
    {
        return $this->belongsTo(Coa::class);
    }
}
