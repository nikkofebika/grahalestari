<?php

namespace App\Enums;

enum CitizenFeeStatus: string
{
    use BaseEnum;

    case IN_PROGRESS = 'in_progress';
    case COMPLETED = 'completed';
}
