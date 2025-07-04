<?php

namespace App\Models;

use App\Enums\Education;
use App\Enums\Gender;
use App\Enums\MaritalStatus;
use App\Enums\Religion;
use App\Traits\Models\BelongsToUser;
use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    use BelongsToUser;

    protected $fillable = [
        'user_id',
        'no_kk',
        'no_ktp',
        'phone',
        'birth_date',
        'birth_place',
        'gender',
        'religion',
        'marital_status',
        'education',
        'job',
        'address',
    ];

    protected $casts = [
        'gender' => Gender::class,
        'religion' => Religion::class,
        'marital_status' => MaritalStatus::class,
        'education' => Education::class,
    ];
}
