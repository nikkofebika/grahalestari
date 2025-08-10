<?php

namespace App\Rules;

use App\Models\Tenant;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class TenantRule implements ValidationRule
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

        if (Tenant::where('id', $value)->doesntExist()) {
            $fail('The :attribute does not exist.');
        }
    }
}
