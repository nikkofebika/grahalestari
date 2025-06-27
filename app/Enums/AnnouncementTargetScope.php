<?php

namespace App\Enums;

enum AnnouncementTargetScope: string
{
    use BaseEnum;

    case PUBLIC = 'public';
    case ADMIN_RT = 'admin_rt';
    case ADMIN_RW = 'admin_rw';

    // public static function options(): array
    // {
    //     return [
    //         self::PUBLIC->value => self::PUBLIC->label,
    //         self::ADMIN_RT->value => self::ADMIN_RT->label,
    //         self::ADMIN_RW->value => self::ADMIN_RW->label,
    //     ];
    // }
}
