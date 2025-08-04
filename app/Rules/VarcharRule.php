<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class VarcharRule implements ValidationRule
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

        if (strlen($value) < 1) {
            $fail('The :attribute must be at least 1 characters.');
        }

        if (strlen($value) > 250) {
            $fail('The :attribute must be at most 250 characters.');
        }
    }
}
