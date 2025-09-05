<?php

namespace App\Http\Requests\ProfitActivityCategory;

use App\Rules\DescriptionRule;
use App\Rules\ExistCoaRule;
use App\Rules\NameRule;
use App\Rules\TenantedRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    public function prepareForValidation(): void
    {
        $this->merge([
            'tenant_id' => $this->tenant_id ?? auth()->user()->tenant_id ?? 1,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'tenant_id' => [new TenantedRule()],
            'debit_coa_id' => [new ExistCoaRule(fn($q) => $q->whereParent(false))],
            'credit_coa_id' => [new ExistCoaRule(fn($q) => $q->whereParent(false))],
            'name' => [new NameRule],
            'description' => [new DescriptionRule],
        ];
    }
}
