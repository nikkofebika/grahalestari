<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\UserType;
use App\Interfaces\Models\TenantedInterface;
use App\Traits\Models\CreatedInfo;
use App\Traits\Models\CustomSoftDeletes;
use App\Traits\Models\UpdatedInfo;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Permission\Traits\HasRoles;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject, TenantedInterface, HasMedia
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, CreatedInfo, UpdatedInfo, CustomSoftDeletes, HasRoles, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'parent_id', // if null, it's mean kepala keluarga
        'group_id',
        'tenant_id',
        'name',
        'email',
        'password',
        'type',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'type' => UserType::class,
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (self $model) {
            if (!$model->group_id && $model->tenant_id) {
                $model->group_id = $model->tenant?->parent?->id;
            }
        });
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    protected function password(): Attribute
    {
        return Attribute::make(
            set: fn(?string $value) => bcrypt($value),
        );
    }

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    protected function getIsGodAttribute(): bool
    {
        return $this->type->is(UserType::GOD);
    }

    protected function getIsAdminRwAttribute(): bool
    {
        return $this->type->is(UserType::ADMIN_RW);
    }

    protected function getIsAdminRtAttribute(): bool
    {
        return $this->type->is(UserType::ADMIN_RT);
    }

    protected function getIsUserAttribute(): bool
    {
        return $this->type->is(UserType::USER);
    }

    public function childs(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Rw::class, 'group_id')->withoutGlobalScopes();
    }

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Rt::class)->withoutGlobalScopes();
    }

    public function detail(): HasOne
    {
        return $this->hasOne(UserDetail::class);
    }

    /**
     * @return MorphOne<TMedia, $this>
     */
    public function image(): MorphOne
    {
        return $this->morphOne($this->getMediaModel(), 'model');
    }

    public function scopeTenanted(Builder $query): void
    {
        /** @var User */
        $user = auth()->user();

        if ($user->is_admin_rw) {
            $query->where(
                fn($q) => $q->where('group_id', $user->group_id)
            );
        } elseif (!$user->is_god) {
            $query->where('tenant_id', $user->tenant_id);
        }
    }

    public function scopeSelectMinimalist(Builder $query, $additionalColumns = [])
    {
        $query->select('id', 'name', ...$additionalColumns);
    }

    public function scopeSearch(Builder $query, string $search)
    {
        $query->where('name', 'like', "%{$search}%")
            ->orWhere('email', 'like', "%{$search}%");
    }

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection('default')
            ->singleFile();
    }
}
