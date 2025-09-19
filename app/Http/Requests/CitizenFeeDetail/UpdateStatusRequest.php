<?php

namespace App\Http\Requests\CitizenFeeDetail;

use App\Enums\CitizenFeePaymentStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateStatusRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'paymet_status' => ['required', new Enum(CitizenFeePaymentStatus::class)],
        ];
    }
}
