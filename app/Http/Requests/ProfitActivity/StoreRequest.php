<?php

namespace App\Http\Requests\ProfitActivity;

use App\Models\ProfitActivityCategory;
use App\Rules\AmountRule;
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
            'profit_activity_category_id' => [new TenantedRule(ProfitActivityCategory::class, 'Profit activity category not found')],
            'name' => [new NameRule],
            'date' => ['required', 'date'],
            'amount' => [new AmountRule],
            'files' => ['nullable', 'array'],
            'files.*' => ['required', 'mimes:' . config('app.file_mimes_types')],
        ];
    }
}
