<?php

namespace App\Http\Requests\Rw;

use App\Rules\LatLngRule;
use App\Rules\NameRule;
use App\Rules\TenantNumberRule;
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
            'leader_id' => ['nullable', 'exists:users,id'],
            'province_id' => ['required', 'integer'],
            'province_name' => ['nullable', new NameRule],
            'city_id' => ['required', 'integer'],
            'city_name' => ['nullable', new NameRule],
            'district_id' => ['required', 'integer'],
            'district_name' => ['nullable', new NameRule],
            'village_id' => ['required', 'integer'],
            'village_name' => ['nullable', new NameRule],
            'name' => [new NameRule],
            'number' => ['required', new TenantNumberRule],
            'latitude' => ['required', new LatLngRule],
            'longitude' => ['required', new LatLngRule],
            'postal_code' => ['required', 'string', 'size:5'],
            'address' => ['required', 'string', 'min:2', 'max:100'],
        ];
    }
}
