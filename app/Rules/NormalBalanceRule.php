<?php

namespace App\Rules;

use App\Enums\NormalBalance;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class NormalBalanceRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (empty($value)) {
            $fail('The :attribute is required.');
        }

        if (!in_array($value, NormalBalance::getValues())) {
            $fail('The :attribute must be ' . NormalBalance::DEBIT->value . ' or ' . NormalBalance::CREDIT->value);
        }
    }
}
