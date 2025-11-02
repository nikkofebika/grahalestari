<?php

namespace App\Traits\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait CreatedInfo
{
    public static function bootCreatedInfo()
    {
        static::creating(function (self $model) {
            if (!$model->created_by_id) {
                $model->created_by_id = auth()->id();
            }
        });
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }
}
