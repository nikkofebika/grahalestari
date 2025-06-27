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
}
