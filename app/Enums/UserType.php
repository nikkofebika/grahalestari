<?php

namespace App\Enums;

enum UserType: string
{
    use BaseEnum;

    case GOD = 'god';
    case ADMIN_RW = 'admin_rw';
    case ADMIN_RT = 'admin_rt';
    case USER = 'user';
}
