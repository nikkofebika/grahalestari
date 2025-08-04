<?php

namespace App\Http\Requests\Announcement;

use App\Enums\AnnouncementCategory;
use App\Enums\AnnouncementTargetScope;
use App\Rules\NameRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreRequest extends FormRequest
{
    public function prepareForValidation(): void
    {
        $this->merge([
            'start_at' => str_replace('T', ' ', $this->start_at),
            'end_at' => str_replace('T', ' ', $this->end_at),
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
            'category' => ['required', new Enum(AnnouncementCategory::class)],
            'target_scope' => ['required', new Enum(AnnouncementTargetScope::class)],
            'title' => [new NameRule],
            'start_at' => ['required', 'date_format:Y-m-d H:i'],
            'end_at' => ['required', 'date_format:Y-m-d H:i'],
            'description' => ['required', 'string', 'min:2'],
        ];
    }
}
