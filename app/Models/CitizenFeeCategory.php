<?php

namespace App\Models;

use App\Models\Scopes\TenantedScope;
use App\Traits\Models\BelongsToTenant;
use App\Traits\Models\CreatedInfo;
use App\Traits\Models\CustomSoftDeletes;
use App\Traits\Models\UpdatedInfo;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[ScopedBy([TenantedScope::class])]
class CitizenFeeCategory extends BaseModel
{
    use BelongsToTenant, CustomSoftDeletes, CreatedInfo, UpdatedInfo;

    protected $fillable = [
        'tenant_id',
        'debit_coa_id',
        'credit_coa_id',
        'name',
        'fix_amount',
        'description',
    ];

    protected $appends = [
        'fix_amount_formatted',
    ];

    public function getFixAmountFormattedAttribute(): string|null
    {
        return $this->fix_amount ? formatNumber($this->fix_amount) : null;
    }

    public function citizenFees(): HasMany
    {
        return $this->hasMany(CitizenFee::class);
    }

    public function debitCoa(): BelongsTo
    {
        return $this->belongsTo(Coa::class, 'debit_coa_id');
    }

    public function creditCoa(): BelongsTo
    {
        return $this->belongsTo(Coa::class, 'credit_coa_id');
    }
}
