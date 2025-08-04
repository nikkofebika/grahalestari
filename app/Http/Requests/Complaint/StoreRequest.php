<?php

namespace App\Http\Requests\Complaint;

use App\Enums\ComplaintCategory;
use App\Enums\ComplaintStatus;
use App\Rules\DescriptionRule;
use App\Rules\LatLngRule;
use App\Rules\NameRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

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
            'category' => ['required', new Enum(ComplaintCategory::class)],
            // 'status' => ['nullable', new Enum(ComplaintStatus::class)],
            'title' => [new NameRule],
            'description' => ['required', new DescriptionRule],
            'latitude' => ['nullable', new LatLngRule],
            'longitude' => ['nullable', new LatLngRule],
            'location' => [new NameRule],
            // 'handled_by_id' => ['nullable', 'exists:users,id'],
            // 'handled_at' => ['nullable', 'date_format:Y-m-d H:i'],
            // 'done_by_id' => ['nullable', 'exists:users,id'],
            // 'done_at' => ['nullable', 'date_format:Y-m-d H:i'],
            // 'feedback' => ['required', new DescriptionRule],
        ];
    }
}
