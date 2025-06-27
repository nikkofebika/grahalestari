<?php

namespace App\Traits\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait BelongsToUser
{
    public static function bootBelongsToUser()
    {
        static::creating(function (self $model) {
            if (!$model->user_id) {
                $model->user_id = auth()->id();
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
