<?php

namespace App\Models;

use App\Models\Scopes\TenantedByTenantScope;
use App\Traits\Models\CreatedInfo;
use App\Traits\Models\CustomSoftDeletes;
use App\Traits\Models\UpdatedInfo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tenant extends BaseModel
{
    protected $table = 'tenants';

    use CreatedInfo, UpdatedInfo, CustomSoftDeletes;

    protected $fillable = [
        'parent_id',
        'leader_id',
        'province_id',
        'province_name',
        'city_id',
        'city_name',
        'district_id',
        'district_name',
        'village_id',
        'village_name',
        'postal_code',
        'name',
        'number',
        'address',
        'latitude',
        'longitude',
    ];

    protected static function booted(): void
    {
        static::addGlobalScope(new TenantedByTenantScope);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function leader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'leader_id');
    }

    public function childs(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    public function coas(): HasMany
    {
        return $this->hasMany(Coa::class);
    }

    public function scopeSelectMinimalist(Builder $query, $additionalColumns = [])
    {
        $query->select('id', 'name', 'number', ...$additionalColumns);
    }


    public function scopeSearch(Builder $query, string $search)
    {
        $query->where('name', 'like', "%{$search}%");
    }
}
