<?php

namespace App\Models;

use App\Models\Scopes\WhereRtScope;

class Rt extends Tenant
{
    protected static function booted(): void
    {
        parent::booted();
        static::addGlobalScope(new WhereRtScope);
    }
}
