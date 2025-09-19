<?php

namespace App\Models;

use App\Enums\CitizenFeePaymentStatus;
use App\Traits\Models\CreatedInfo;
use App\Traits\Models\UpdatedInfo;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class CitizenFeeDetail extends BaseModel implements HasMedia
{
    use CreatedInfo, UpdatedInfo, InteractsWithMedia;

    protected $fillable = [
        'citizen_fee_id',
        'user_id',
        'payment_at',
        'amount',
        'payment_status',
        'payment_approved_by_id',
        'payment_approved_at',
    ];

    protected $appends = [
        'amount_formatted',
    ];

    protected $casts = [
        'payment_status' => CitizenFeePaymentStatus::class
    ];

    public function getAmountFormattedAttribute(): string
    {
        return formatNumber($this->amount);
    }

    public function citizenFee(): BelongsTo
    {
        return $this->belongsTo(CitizenFee::class);
    }

    public function paymentApprovedBy(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
