<?php

namespace App\Enums;

enum Religion: string
{
    use BaseEnum;

    case ISLAM = 'islam';
    case KRISTEN = 'kristen';
    case KATOLIK = 'katolik';
    case HINDU = 'hindu';
    case BUDHA = 'budha';
    case KHONGHUCU = 'khonghucu';

    public function color(): string
    {
        return match ($this) {
            self::ISLAM => '#4e79a7',
            self::KRISTEN => '#f28e2b',
            self::KATOLIK => '#e15759',
            self::HINDU => '#76b7b2',
            self::BUDHA => '#59a14f',
            self::KHONGHUCU => '#edc948',
        };
    }
}
