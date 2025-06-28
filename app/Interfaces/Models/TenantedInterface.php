<?php

namespace App\Interfaces\Models;

use Illuminate\Database\Eloquent\Builder;

interface TenantedInterface
{
    public function scopeTenanted(Builder $query): void;
}
