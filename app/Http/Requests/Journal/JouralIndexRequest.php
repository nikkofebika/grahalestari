<?php

namespace App\Http\Requests\Journal;

use Illuminate\Foundation\Http\FormRequest;

class JouralIndexRequest extends FormRequest
{
    public function prepareForValidation(): void
    {
        $period = isset($this->filter['period']) ? date('Y-m', strtotime($this->filter['period'])) : date('Y-m');
        $this->merge([
            'filter' => [
                'period' => $period,
                'coa_id' => $this->filter['coa_id'] ?? null,
            ]
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
            'filter.period' => ['nullable', 'date_format:Y-m'],
            'filter.coa_id' => ['nullable', 'exists:coas,id'],
        ];
    }
}
