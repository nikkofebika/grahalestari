<?php

namespace App\Enums;

enum CitizenFeePaymentStatus: string
{
    use BaseEnum;

    case NOT_PAID = 'not_paid';
    case IN_PROGRESS = 'in_progress';
    case PAID = 'paid';
    case REJECTED = 'rejected';
}
