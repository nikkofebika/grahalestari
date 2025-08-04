<?php

namespace App\Enums;

enum NormalBalance: string
{
    use BaseEnum;

    case DEBIT = 'debit';
    case CREDIT = 'credit';
}
