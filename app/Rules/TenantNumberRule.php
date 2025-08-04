<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class TenantNumberRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_int($value)) {
            $fail('The :attribute must be a integer.');
        }

        if ((int)$value < 1) {
            $fail('The :attribute must greater than 0');
        }

        if ((int)$value > 255) {
            $fail('The :attribute must less than 255.');
        }
    }
}
