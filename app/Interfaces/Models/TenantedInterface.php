<?php

namespace App\Interfaces\Models;

use Illuminate\Database\Eloquent\Builder;

interface TenantedInterface
{
    public function scopeTenanted(Builder $query): void;
    public function scopeFindTenanted(Builder $query, int|string $id, bool $fail = true): self;
}
