<?php

namespace App\Http\Services\Dashboard;

use App\Enums\Gender;
use App\Models\User;

class DashboardService
{
    public function byGender()
    {
        // $male = User::wherehas('detail', fn($q) => $q->where('gender', Gender::MALE))->count();
        // $female = User::wherehas('detail', fn($q) => $q->where('gender', Gender::FEMALE))->count();

        $male = 200;
        $female = 100;

        return [
            'total' => $male + $female,
            'users' => [
                [
                    'gender' => Gender::MALE->label(),
                    'total' => $male,
                    'fill' => 'blue'
                ],
                [
                    'gender' => Gender::FEMALE->label(),
                    'total' => $female,
                    'fill' => 'red'
                ]
            ]
        ];
    }
}
