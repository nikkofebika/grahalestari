<?php

namespace App\Enums;

enum MaritalStatus: string
{
    use BaseEnum;

    case SINGLE = 'single';
    case MARRIED = 'married';
    case DIVORCED = 'divorced';
    case WIDOWED = 'widowed';

    public function label(): string
    {
        return match ($this) {
            self::SINGLE => 'Belum Menikah',
            self::MARRIED => 'Menikah',
            self::DIVORCED => 'Cerai Hidup',
            self::WIDOWED => 'Cerai Mati',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::SINGLE => '#4e79a7',
            self::MARRIED => '#f28e2b',
            self::DIVORCED => '#e15759',
            self::WIDOWED => '#76b7b2',
        };
    }
}
