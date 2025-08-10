<?php

namespace App\Models;

use App\Enums\NormalBalance;
use App\Models\Scopes\TenantedScope;
use App\Traits\Models\BelongsToTenant;
use App\Traits\Models\CreatedInfo;
use App\Traits\Models\CustomSoftDeletes;
use App\Traits\Models\UpdatedInfo;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

#[ScopedBy([TenantedScope::class])]
class Journal extends BaseModel implements HasMedia
{
    use BelongsToTenant, CreatedInfo, UpdatedInfo, CustomSoftDeletes, InteractsWithMedia;

    protected $fillable = [
        'tenant_id',
        'transaction_date',
        'normal_balance',
        'amount',
        'description',
    ];

    protected $appends = [
        'amount_formatted',
    ];

    protected $casts = [
        'normal_balance' => NormalBalance::class,
    ];

    public function getAmountFormattedAttribute(): string
    {
        return formatNumber($this->amount);
    }

    // protected function debit(): Attribute
    // {
    //     return Attribute::make(
    //         get: fn(int $value) => formatNumber($value),
    //     );
    // }

    // protected function credit(): Attribute
    // {
    //     return Attribute::make(
    //         get: fn(int $value) => formatNumber($value),
    //     );
    // }

    public function detail(): HasOne
    {
        return $this->hasOne(JournalDetail::class);
    }

    public function details(): HasMany
    {
        return $this->hasMany(JournalDetail::class);
    }

    public function scopeSelectMinimalist(Builder $query, $additionalColumns = [])
    {
        $query->select('id', 'tenant_id', 'transaction_date', 'normal_balance', 'amount', 'description', ...$additionalColumns);
    }

    public function scopeWhereYearMonth(Builder $q, string $period): void
    {
        $q->where(
            fn($q) => $q->whereYear('transaction_date', date('Y', strtotime($period)))
                ->whereMonth('transaction_date', date('m', strtotime($period)))
        );
    }

    public function scopeWhereCoaId(Builder $q, string|int $coaId): void
    {
        $q->where(
            fn($q) => $q->whereHas('detail', fn($q) => $q->where('coa_id', $coaId))
        );
    }
}
