<?php

namespace App\Models;

use App\Enums\ComplaintStatus;
use App\Enums\ComplaintCategory;
use App\Models\Scopes\TenantedByUserGroupScope;
use App\Traits\Models\BelongsToUser;
use App\Traits\Models\CustomSoftDeletes;
use App\Traits\Models\UpdatedInfo;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ScopedBy([TenantedByUserGroupScope::class])]
class Complaint extends BaseModel
{
    use BelongsToUser, UpdatedInfo, CustomSoftDeletes;

    protected $fillable = [
        'user_id',
        'category',
        'status',
        'title',
        'description',
        'location',
        'latitude',
        'longitude',
        'handled_by_id',
        'handled_at',
        'done_at',
        'done_by_id',
        'feedback',
    ];

    protected $casts = [
        'category' => ComplaintCategory::class,
        'status' => ComplaintStatus::class,
        'handled_at' => 'datetime',
        'done_at' => 'datetime',
    ];

    public static function booted()
    {
        static::creating(function (self $model) {
            if (!$model->status) {
                $model->status = ComplaintStatus::PENDING;
            }
        });
    }

    public function handledBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'handled_by_id');
    }

    public function doneBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'done_by_id');
    }
}
