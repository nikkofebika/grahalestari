<?php

namespace App\Enums;

enum MaritalStatus: string
{
    use BaseEnum;

    case SINGLE = 'single';
    case MARRIED = 'married';
    case DIVORCED = 'divorced';
    case WIDOWED = 'widowed';
}
