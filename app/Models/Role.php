<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Spatie\Permission\Models\Role as ModelsRole;

class Role extends ModelsRole
{
    protected $fillable = [
        'tenant_id',
        'name',
        'guard_name',
    ];

    protected static function booted(): void
    {
        static::saving(function (self $model) {
            // $user = auth()->user();
            // if (empty($model->tenant_id) && !$user->is_super_admin) $model->tenant_id = $user->tenant_id ?? null;
        });
    }

    public function scopeTenanted(Builder $query): Builder
    {
        $user = auth()->user();
        if ($user->is_super_admin) {
            return $query;
        }

        return $query->where('tenant_id', $user->tenant_id);
    }

    public function scopeFindTenanted(Builder $query, int|string $id, bool $fail = true): self
    {
        $query->tenanted()->where('id', $id);
        if ($fail) {
            return $query->firstOrFail();
        }

        return $query->first();
    }

    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    // public function tenant()
    // {
    //     return $this->belongsTo(Tenant::class);
    // }

    public function scopeSearch(Builder $query, string $search)
    {
        $query->where('name', 'like', "%{$search}%");
    }
}
