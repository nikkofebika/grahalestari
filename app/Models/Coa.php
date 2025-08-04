<?php

namespace App\Models;

use App\Enums\NormalBalance;
use App\Interfaces\Models\TenantedInterface;
use App\Models\Scopes\TenantedScope;
use App\Traits\Models\CreatedInfo;
use App\Traits\Models\CustomSoftDeletes;
use App\Traits\Models\Tenanted;
use App\Traits\Models\UpdatedInfo;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[ScopedBy([TenantedScope::class])]
class Coa extends BaseModel implements TenantedInterface
{
    use Tenanted, CustomSoftDeletes, CreatedInfo, UpdatedInfo;

    protected $fillable = [
        'tenant_id',
        'parent_id',
        'account_name',
        'account_number',
        'normal_balance',
    ];

    protected $casts = [
        'normal_balance' => NormalBalance::class,
    ];

    protected static function booted(): void
    {
        static::saving(function (self $model) {
            if ($model->parent_id) {
                $model->normal_balance = $model->parent?->normal_balance;
            }
        });
    }

    public function scopeSelectMinimalist(Builder $query, $additionalColumns = [])
    {
        $query->select('id', 'tenant_id', 'parent_id', 'account_name', 'account_number', ...$additionalColumns);
    }

    public function scopeWhereParent(Builder $query, bool $isParent = true): void
    {
        if ($isParent) {
            $query->whereNull('parent_id');
        } else {
            $query->whereNotNull('parent_id');
        }
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function childs(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id');
    }
}
