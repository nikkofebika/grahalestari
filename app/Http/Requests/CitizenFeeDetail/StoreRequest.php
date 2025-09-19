<?php

namespace App\Http\Requests\CitizenFeeDetail;

use App\Enums\CitizenFeePaymentStatus;
use App\Models\CitizenFee;
use App\Models\CitizenFeeCategory;
use App\Models\User;
use App\Rules\AmountRule;
use App\Rules\TenantedRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreRequest extends FormRequest
{
    public function prepareForValidation(): void
    {
        $this->merge([
            'payment_status' => CitizenFeePaymentStatus::PAID->value,
            'payment_at' => $this->payment_at ? date('Y-m-d H:i:s', strtotime($this->payment_at)) : date('Y-m-d H:i:s'),
            'payment_approved_at' => date('Y-m-d H:i:s'),
            'payment_approved_by_id' => auth()->id(),
        ]);
    }

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
            'payment_at' => ['required', 'date:Y-m-d H:i:s'],
            'amount' => ['integer', 'min:' . $minAmount, new AmountRule],
            'payment_status' => ['nullable', new Enum(CitizenFeePaymentStatus::class)],
            'payment_approved_at' => ['nullable', 'date:Y-m-d H:i:s'],
            'payment_approved_by_id' => ['nullable', new TenantedRule(User::class, 'Data warga tidak ditemukan')],
        ];
    }
}
