<?php

namespace App\Http\Requests\Complaint;

use App\Enums\ComplaintStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class HandleRequest extends FormRequest
{
    public function prepareForValidation(): void
    {
        $this->merge([
            'handled_at' => $this->handled_at ? str_replace('T', ' ', $this->handled_at) : null,
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
            'status' => ['required', new Enum(ComplaintStatus::class)],
            'handled_at' => ['required', 'date_format:Y-m-d H:i'],
            'handled_feedback' => ['required', 'string'],
        ];
    }
}
