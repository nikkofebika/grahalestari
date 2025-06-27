<?php

namespace App\Enums;

enum ComplaintStatus: string
{
    use BaseEnum;

    case PENDING = 'pending';
    case IN_PROGRESS = 'in_progress';
    case DONE = 'done';
}
