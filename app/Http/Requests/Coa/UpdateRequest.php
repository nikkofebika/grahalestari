<?php

namespace App\Http\Requests\Coa;

use App\Models\Coa;
use App\Rules\NameRule;
use App\Rules\UniqueCoaAccountNumberRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $coa = $this->coa;
        if (!$coa instanceof Coa) {
            $coa = Coa::select('id', 'tenant_id')->where('id', $coa)->firstOrFail();
        }

        return [
            'account_name' => [new NameRule],
            'account_number' => [new UniqueCoaAccountNumberRule($coa->tenant_id, fn($q) => $q->where('id', '!=', $coa->id))], // unique per tenant
        ];
    }
}
