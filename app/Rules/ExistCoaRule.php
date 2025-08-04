<?php

namespace App\Rules;

use App\Models\Coa;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ExistCoaRule implements ValidationRule
{
    public function __construct(private ?Closure $query = null) {}

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

        if (Coa::where('id', $value)->when($this->query, $this->query)->doesntExist()) {
            $fail('The :attribute does not exist.');
        }
    }
}
