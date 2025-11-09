<?php

namespace App\Enums;

enum ComplaintStatus: string
{
    use BaseEnum;

    case PENDING = 'pending';
    case IN_PROGRESS = 'in_progress';
    case DONE = 'done';

    public function getColor(): string
    {
        return match ($this) {
            self::PENDING => 'warning',
            self::IN_PROGRESS => 'info',
            self::DONE => 'success',
        };
    }
}
