<?php

namespace App\Models;

use App\Enums\CitizenFeeStatus;
use App\Interfaces\Models\TenantedInterface;
use App\Traits\Models\CreatedInfo;
use App\Traits\Models\CustomSoftDeletes;
use App\Traits\Models\Tenanted;
use App\Traits\Models\UpdatedInfo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class CitizenFee extends BaseModel implements TenantedInterface, HasMedia
{
    use Tenanted, CustomSoftDeletes, CreatedInfo, UpdatedInfo, InteractsWithMedia;

    protected $fillable = [
        'citizen_fee_category_id',
        'name',
        'date',
        'status',
    ];

    protected $appends = [
        'total_amount',
        'total_amount_formatted',
    ];

    protected $casts = [
        'status' => CitizenFeeStatus::class
    ];

    public function getTotalAmountAttribute(): string
    {
        return $this->details()->sum('amount');
    }

    public function getTotalAmountFormattedAttribute(): string
    {
        return formatNumber($this->total_amount);
    }

    public function scopeTenanted(Builder $query, ?User $user = null): void
    {
        $query->whereHas('category', fn($q) => $q->tenanted($user));
    }

    public function journals(): MorphOne
    {
        return $this->morphOne(Journal::class, 'model');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(CitizenFeeCategory::class, 'citizen_fee_category_id');
    }

    public function details(): HasMany
    {
        return $this->hasMany(CitizenFeeDetail::class);
    }
}
