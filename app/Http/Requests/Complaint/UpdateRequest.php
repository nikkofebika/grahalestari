<?php

namespace App\Http\Requests\Complaint;

use App\Enums\ComplaintCategory;
use App\Enums\ComplaintStatus;
use App\Rules\DescriptionRule;
use App\Rules\LatLngRule;
use App\Rules\NameRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateRequest extends FormRequest
{
    public function prepareForValidation(): void
    {
        dump($this->all());
        $this->merge([
            'handled_at' => $this->handled_at ? str_replace('T', ' ', $this->handled_at) : null,
            'done_at' => $this->done_at ? str_replace('T', ' ', $this->done_at) : null,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        dd($this->all());
        return [
            'category' => ['required', new Enum(ComplaintCategory::class)],
            'status' => ['nullable', new Enum(ComplaintStatus::class)],
            'title' => ['required', new NameRule],
            'description' => ['required', new DescriptionRule],
            'latitude' => ['nullable', new LatLngRule],
            'longitude' => ['nullable', new LatLngRule],
            'location' => ['required', new NameRule],
            'handled_by_id' => ['nullable', 'exists:users,id'],
            'handled_at' => ['nullable', 'date_format:Y-m-d H:i'],
            'done_by_id' => ['nullable', 'exists:users,id'],
            'done_at' => ['nullable', 'date_format:Y-m-d H:i'],
            'feedback' => ['required', new DescriptionRule],
        ];
    }
}
