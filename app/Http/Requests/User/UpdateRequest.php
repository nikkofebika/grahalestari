<?php

namespace App\Http\Requests\User;

use App\Enums\UserType;
use App\Rules\NameRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function prepareForValidation(): void
    {
        $data = $this->all();

        if (!$this->filled('password')) {
            unset($data['password']);
        }

        $this->replace($data);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'tenant_id' => ['nullable', 'exists:tenants,id'],
            'name' => ['required', new NameRule],
            'email' => ['required', 'string', 'email'],
            'password' => ['nullable', 'string'],
            'type' => ['required', new Enum(UserType::class)],
        ];
    }
}
