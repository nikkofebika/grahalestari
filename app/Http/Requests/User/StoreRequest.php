<?php

namespace App\Http\Requests\User;

use App\Enums\Education;
use App\Enums\Gender;
use App\Enums\MaritalStatus;
use App\Enums\Religion;
use App\Enums\UserType;
use App\Rules\NameRule;
use App\Rules\PhoneRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'parent_id' => ['nullable', 'exists:users,id'],
            'group_id' => ['nullable', 'exists:tenants,id'],
            'tenant_id' => ['nullable', 'exists:tenants,id'],
            'name' => [new NameRule],
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
            'type' => ['required', new Enum(UserType::class)],
            'image' => ['sometimes', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],

            "no_kk" => ['nullable', 'string', 'max:16'],
            "no_ktp" => ['nullable', 'string', 'max:16'],
            "phone" => ['nullable', new PhoneRule],
            "birth_date" => ['nullable', 'date'],
            "birth_place" => ['nullable', 'string'],
            'gender' => ['nullable', new Enum(Gender::class)],
            'religion' => ['nullable', new Enum(Religion::class)],
            'marital_status' => ['nullable', new Enum(MaritalStatus::class)],
            'education' => ['nullable', new Enum(Education::class)],
            "job" => ['nullable', 'string'],
            "address" => ['nullable', 'string'],
        ];
    }
}
