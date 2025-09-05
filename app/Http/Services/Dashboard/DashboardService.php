<?php

namespace App\Http\Services\Dashboard;

use App\Enums\Education;
use App\Enums\Gender;
use App\Enums\MaritalStatus;
use App\Enums\Religion;
use App\Models\User;

class DashboardService
{
    public function byGender()
    {
        $male = User::wherehas('detail', fn($q) => $q->where('gender', Gender::MALE))->count();
        $female = User::wherehas('detail', fn($q) => $q->where('gender', Gender::FEMALE))->count();

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

    public function byEducation()
    {
        $male = User::wherehas('detail', fn($q) => $q->where('gender', Gender::MALE))->count();
        $female = User::wherehas('detail', fn($q) => $q->where('gender', Gender::FEMALE))->count();

        $sd = 50;
        $smp = 100;
        $sma = 200;
        $d3 = 76;
        $d4 = 43;
        $s1 = 98;
        $s2 = 51;
        $s3 = 23;

        return [
            'total' => $sd + $smp + $sma + $d3 + $d4 + $s1 + $s2 + $s3,
            'users' => [
                [
                    'education' => Education::SD,
                    'total' => $sd,
                    'fill' => '#4e79a7'
                ],
                [
                    'education' => Education::SMP,
                    'total' => $smp,
                    'fill' => '#f28e2b'
                ],
                [
                    'education' => Education::SMA,
                    'total' => $sma,
                    'fill' => '#e15759'
                ],
                [
                    'education' => Education::D3,
                    'total' => $d3,
                    'fill' => '#76b7b2'
                ],
                [
                    'education' => Education::D4,
                    'total' => $d4,
                    'fill' => '#59a14f'
                ],
                [
                    'education' => Education::S1,
                    'total' => $s1,
                    'fill' => '#edc949'
                ],
                [
                    'education' => Education::S2,
                    'total' => $s2,
                    'fill' => '#af7aa1'
                ],
                [
                    'education' => Education::S3,
                    'total' => $s3,
                    'fill' => '#ff9da7'
                ],
            ]
        ];
    }

    public function byReligion()
    {
        $male = User::wherehas('detail', fn($q) => $q->where('gender', Gender::MALE))->count();
        $female = User::wherehas('detail', fn($q) => $q->where('gender', Gender::FEMALE))->count();

        $islam = 50;
        $kristen = 100;
        $katolik = 200;
        $hindu = 76;
        $budha = 43;
        $khonghucu = 98;

        return [
            'total' => $islam + $kristen + $katolik + $hindu + $budha + $khonghucu,
            'users' => [
                [
                    'religion' => Religion::ISLAM,
                    'total' => $islam,
                    'fill' => '#4e79a7'
                ],
                [
                    'religion' => Religion::KRISTEN,
                    'total' => $kristen,
                    'fill' => '#f28e2b'
                ],
                [
                    'religion' => Religion::KATOLIK,
                    'total' => $katolik,
                    'fill' => '#e15759'
                ],
                [
                    'religion' => Religion::HINDU,
                    'total' => $hindu,
                    'fill' => '#76b7b2'
                ],
                [
                    'religion' => Religion::BUDHA,
                    'total' => $budha,
                    'fill' => '#59a14f'
                ],
                [
                    'religion' => Religion::KHONGHUCU,
                    'total' => $khonghucu,
                    'fill' => '#edc949'
                ]
            ]
        ];
    }

    public function byMaritalStatus()
    {
        $male = User::wherehas('detail', fn($q) => $q->where('gender', Gender::MALE))->count();
        $female = User::wherehas('detail', fn($q) => $q->where('gender', Gender::FEMALE))->count();

        $single = 50;
        $married = 100;
        $divorced = 200;
        $widowed = 76;
        return [
            'total' => $single + $married + $divorced + $widowed,
            'users' => [
                [
                    'marital_status' => MaritalStatus::SINGLE,
                    'total' => $single,
                    'fill' => '#4e79a7'
                ],
                [
                    'marital_status' => MaritalStatus::MARRIED,
                    'total' => $married,
                    'fill' => '#f28e2b'
                ],
                [
                    'marital_status' => MaritalStatus::DIVORCED,
                    'total' => $divorced,
                    'fill' => '#e15759'
                ],
                [
                    'marital_status' => MaritalStatus::WIDOWED,
                    'total' => $widowed,
                    'fill' => '#76b7b2'
                ],
            ]
        ];
    }
}
