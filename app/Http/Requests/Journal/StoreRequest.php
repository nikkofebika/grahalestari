<?php

namespace App\Http\Requests\Journal;

use App\Rules\AmountRule;
use App\Rules\ExistCoaRule;
use App\Rules\NormalBalanceRule;
use App\Rules\TenantRule;
use App\Rules\VarcharRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    public function prepareForValidation(): void
    {
        $normalBalance = $this->normal_balance ? $this->normal_balance : $this->segment(2);
        $this->merge([
            // 'tenant_id' => $this->tenant_id ? $this->tenant_id : auth()->user()->tenant_id,
            'tenant_id' => $this->tenant_id ? $this->tenant_id : 1,
            'normal_balance' => $normalBalance,
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
            'tenant_id' => ['required', new TenantRule],
            'normal_balance' => [new NormalBalanceRule],
            'transaction_date' => ['required', 'date'],
            'amount' => [new AmountRule],
            'debit_account_id' => [new ExistCoaRule(fn($q) => $q->whereParent(false))],
            'credit_account_id' => [new ExistCoaRule(fn($q) => $q->whereParent(false))],
            'description' => [new VarcharRule],
            'files' => ['nullable', 'array'],
            'files.*' => ['required', 'mimes:' . config('app.file_mimes_types')],
        ];
    }
}
