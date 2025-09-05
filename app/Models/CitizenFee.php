<?php

namespace App\Models;

use App\Interfaces\Models\TenantedInterface;
use App\Traits\Models\CreatedInfo;
use App\Traits\Models\CustomSoftDeletes;
use App\Traits\Models\Tenanted;
use App\Traits\Models\UpdatedInfo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
        'amount',
    ];

    protected $appends = [
        'amount_formatted',
    ];

    public function getAmountFormattedAttribute(): string
    {
        return formatNumber($this->amount);
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
}
