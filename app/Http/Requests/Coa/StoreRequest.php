<?php

namespace App\Http\Requests\Coa;

use App\Rules\ExistCoaRule;
use App\Rules\NameRule;
use App\Rules\TenantRule;
use App\Rules\UniqueCoaAccountNumberRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'parent_id' => [new ExistCoaRule(fn($q) => $q->whereParent())],
            'tenant_id' => [new TenantRule],
            'account_name' => [new NameRule],
            'account_number' => [new UniqueCoaAccountNumberRule($this->tenant_id)], // unique per tenant
        ];
    }
}
