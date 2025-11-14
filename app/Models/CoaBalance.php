<?php

namespace App\Models;

use App\Interfaces\Models\TenantedInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CoaBalance extends BaseModel implements TenantedInterface
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

    protected static function booted(): void
    {
        // static::creating(function (self $model) {
        //     if (!$model->period_month) {
        //         $model->period_month = date('m');
        //     }

        //     if (!$model->period_year) {
        //         $model->period_year = date('y');
        //     }
        // });

        static::saving(function (self $model) {
            if (!$model->period_month) {
                $model->period_month = date('m');
            }

            if (strlen($model->period_month) === 1) {
                $model->period_month = '0' . $model->period_month;
            }

            if (!$model->period_year) {
                $model->period_year = date('y');
            }
        });
    }


    public function getClosingBalanceAttribute(): int
    {
        return $this->opening_balance + $this->debit - $this->credit;
    }

    public function scopeTenanted(Builder $query): void
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

    public function scopeFindTenanted(Builder $query, int|string $id, bool $fail = true): self
    {
        $query->tenanted()->where('id', $id);
        if ($fail) {
            return $query->firstOrFail();
        }

        return $query->first();
    }

    public function scopeWherePeriod(Builder $q, string $period): void
    {
        $q->where(
            fn($q) => $q->where('period_year', date('Y', strtotime($period)))
                ->where('period_month', date('m', strtotime($period)))
        );
    }

    public function coa(): BelongsTo
    {
        return $this->belongsTo(Coa::class);
    }
}
