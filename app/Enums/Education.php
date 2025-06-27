<?php

namespace App\Enums;

enum Education: string
{
    use BaseEnum;

    case SD = 'SD';
    case SMP = 'SMP';
    case SMA = 'SMA';
    case D3 = 'D3';
    case D4 = 'D4';
    case S1 = 'S1';
    case S2 = 'S2';
    case S3 = 'S3';
}
