<?php

namespace App\Enums;

enum UserType: string
{
    use BaseEnum;

    case GOD = 'god';
    case ADMIN = 'admin';
    case USER = 'user';
}
