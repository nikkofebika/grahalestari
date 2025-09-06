<?php

namespace App\Http\Requests\CitizenFeeDetail;

use App\Models\CitizenFee;
use App\Models\CitizenFeeCategory;
use App\Models\User;
use App\Rules\AmountRule;
use App\Rules\TenantedRule;
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
        $citizenFeeCategory = CitizenFeeCategory::select('fix_amount')->whereHas('citizenFees', fn($q) => $q->where('id', $this->input('citizen_fee_id')))->firstOrFail();

        $minAmount = $citizenFeeCategory->fix_amount && $citizenFeeCategory->fix_amount > 0 ? $citizenFeeCategory->fix_amount : 1;

        return [
            'citizen_fee_id' => [new TenantedRule(CitizenFee::class, 'Data iuran warga tidak ditemukan')],
            'user_id' => [new TenantedRule(User::class, 'Data warga tidak ditemukan')],
            'date' => ['required', 'date'],
            'amount' => ['integer', 'min:' . $minAmount, new AmountRule],
        ];
    }
}
