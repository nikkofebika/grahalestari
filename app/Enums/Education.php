<?php

namespace App\Enums;

enum Education: string
{
    use BaseEnum;

    case SD = 'SD';
    case SMP = 'SMP';
    case SMA = 'SMA';
    case D3 = 'D3';
        // case D4 = 'D4';
    case S1 = 'S1';
    case S2 = 'S2';
    case S3 = 'S3';

    public function color(): string
    {
        return match ($this) {
            self::SD => '#3b82f6',
            self::SMP => '#ec4899',
            self::SMA => '#f59e0b',
            self::D3 => '#84cc16',
            // self::D4 => '#22c55e',
            self::S1 => '#14b8a6',
            self::S2 => '#8b5cf6',
            self::S3 => '#f43f5e',
        };
    }
}
