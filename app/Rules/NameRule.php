<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class NameRule implements ValidationRule
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

        if (!is_string($value)) {
            $fail('The :attribute must be a string.');
        }

        if (strlen($value) < 2) {
            $fail('The :attribute must be at least 2 characters.');
        }

        if (strlen($value) > 100) {
            $fail('The :attribute must be at most 100 characters.');
        }
    }
}
