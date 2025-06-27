<?php

namespace App\Http\Requests\Rw;

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
            'leader_id' => ['nullable', 'exists:users,id'],
            'province_id' => ['required', 'integer'],
            'province_name' => ['required', 'string', 'max:50'],
            'city_id' => ['required', 'integer'],
            'city_name' => ['required', 'string', 'max:50'],
            'district_id' => ['required', 'integer'],
            'district_name' => ['required', 'string', 'max:50'],
            'village_id' => ['required', 'integer'],
            'village_name' => ['required', 'string', 'max:50'],
            'name' => ['required', new NameRule],
            'latitude' => ['required', new LatLngRule],
            'longitude' => ['required', new LatLngRule],
            'postal_code' => ['required', 'string', 'size:5'],
            'address' => ['required', 'string', 'min:2', 'max:100'],
        ];
    }
}
