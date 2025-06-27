<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class LatLngRule implements ValidationRule
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

        if (strlen($value) < 10) {
            $fail('The :attribute must be at least 10 characters.');
        }

        if (strlen($value) > 20) {
            $fail('The :attribute must be at most 20 characters.');
        }
    }
}
