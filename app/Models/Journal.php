<?php

namespace App\Models;

use App\Enums\NormalBalance;
use App\Models\Scopes\TenantedScope;
use App\Traits\Models\CreatedInfo;
use App\Traits\Models\CustomSoftDeletes;
use App\Traits\Models\UpdatedInfo;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

#[ScopedBy([TenantedScope::class])]
class Journal extends BaseModel implements HasMedia
{
    use CreatedInfo, UpdatedInfo, CustomSoftDeletes, InteractsWithMedia;

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
        return number_format($this->amount, 0, ',', '.');
    }

    public function getDetailAttribute(): JournalDetail
    {
        return $this->details->where($this->normal_balance->value, '>', 0)->first();
    }
    // protected function debit(): Attribute
    // {
    //     return Attribute::make(
    //         get: fn(int $value) => number_format($value, 0, ',', '.'),
    //     );
    // }

    // protected function credit(): Attribute
    // {
    //     return Attribute::make(
    //         get: fn(int $value) => number_format($value, 0, ',', '.'),
    //     );
    // }

    public function details(): HasMany
    {
        return $this->hasMany(JournalDetail::class);
    }
}
