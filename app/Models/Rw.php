<?php

namespace App\Models;

use App\Models\Scopes\WhereRwScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;

class Rw extends Tenant
{
    protected static function booted(): void
    {
        parent::booted();
        static::addGlobalScope(new WhereRwScope);
    }
}
