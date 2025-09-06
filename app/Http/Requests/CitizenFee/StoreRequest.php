<?php

namespace App\Http\Requests\CitizenFee;

use App\Models\CitizenFeeCategory;
use App\Rules\NameRule;
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
        return [
            'citizen_fee_category_id' => [new TenantedRule(CitizenFeeCategory::class, 'Kategori iuran warga tidak ditemukan')],
            'name' => [new NameRule],
            'date' => ['required', 'date'],
            'files' => ['nullable', 'array'],
            'files.*' => ['required', 'mimes:' . config('app.file_mimes_types')],
        ];
    }
}
