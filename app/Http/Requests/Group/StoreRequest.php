<?php

namespace App\Http\Requests\Tenant;

use App\Rules\LatLngRule;
use App\Rules\NameRule;
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
            'parent_id' => ['nullable', 'integer'],
            'province_id' => ['required', 'integer'],
            'city_id' => ['required', 'integer'],
            'district_id' => ['required', 'integer'],
            'village_id' => ['required', 'integer'],
            'name' => ['required', new NameRule],
            'latitude' => ['required', new LatLngRule],
            'longitude' => ['required', new LatLngRule],
            'postal_code' => ['required', 'string', 'size:5'],
            'address' => ['required', 'string', 'min:2', 'max:100'],
        ];
    }
}
