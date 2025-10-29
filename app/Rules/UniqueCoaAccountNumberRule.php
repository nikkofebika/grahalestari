<?php

namespace App\Rules;

use App\Models\Coa;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * account number must be unique based on tenant
 */
class UniqueCoaAccountNumberRule implements ValidationRule
{
    public function __construct(private ?int $tenantId = null, private ?Closure $query = null) {}

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

        if (Coa::where('account_number', $value)->where('tenant_id', $this->tenantId)->when($this->query, $this->query)->exists()) {
            $fail('The :attribute must be unique.');
        }
    }
}
