<?php

namespace App\Models;

use App\Enums\AnnouncementCategory;
use App\Enums\AnnouncementTargetScope;
use App\Models\Scopes\TenantedByUserGroupScope;
use App\Traits\Models\BelongsToUser;
use App\Traits\Models\CustomSoftDeletes;
use App\Traits\Models\UpdatedInfo;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Casts\Attribute;

/**
 * @property \Illuminate\Support\Carbon $start_at
 * @property \Illuminate\Support\Carbon $end_at
 */
#[ScopedBy([TenantedByUserGroupScope::class])]
class Announcement extends BaseModel
{
    use BelongsToUser, UpdatedInfo, CustomSoftDeletes;

    protected string $searchKey = 'title';

    protected $fillable = [
        'user_id',
        'category',
        'target_scope',
        'title',
        'start_at',
        'end_at',
        'description',
    ];

    protected $casts = [
        'category' => AnnouncementCategory::class,
        'target_scope' => AnnouncementTargetScope::class,
        'start_at' => 'datetime',
        'end_at' => 'datetime',
    ];

    protected $appends = [
        'is_active'
    ];

    /**
     * Determine active or not by start_at and end_at
     *
     * @return bool
     */
    protected function isActive(): Attribute
    {
        return new Attribute(
            get: fn() => now()->between($this->start_at, $this->end_at),
        );
    }
}
