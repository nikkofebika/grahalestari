<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class PhoneRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_string($value)) {
            $fail('The :attribute must be a string.');
        }

        if (strlen($value) < 8) {
            $fail('The :attribute must be at least 8 characters.');
        }

        if (strlen($value) > 15) {
            $fail('The :attribute must be at most 15 characters.');
        }
    }
}
