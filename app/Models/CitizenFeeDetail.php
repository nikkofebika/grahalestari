<?php

namespace App\Models;

use App\Traits\Models\CreatedInfo;
use App\Traits\Models\UpdatedInfo;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CitizenFeeDetail extends BaseModel
{
    use CreatedInfo, UpdatedInfo;

    protected $fillable = [
        'citizen_fee_id',
        'user_id',
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

    public function citizenFee(): BelongsTo
    {
        return $this->belongsTo(CitizenFee::class);
    }
}
