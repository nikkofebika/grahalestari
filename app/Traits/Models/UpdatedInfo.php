<?php

namespace App\Traits\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait UpdatedInfo
{
    public static function bootUpdatedInfo()
    {
        static::updating(function (self $model) {
            $model->updated_by_id = auth()->id();
        });
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by_id');
    }
}
