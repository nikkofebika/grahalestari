<?php

namespace App\OpenApi\Parameters\User;

use App\Enums\UserType;
use App\OpenApi\Parameters\BaseParameterFactoryParameters;
use App\OpenApi\Parameters\HeaderApplicationJsonParameters;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Parameter;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;

class UserIndexParameters extends BaseParameterFactoryParameters
{
    /**
     * @return Parameter[]
     */
    public function data(): array
    {
        $filters = [
            Parameter::query()
                ->name('filter[search]')
                ->description('Search by name & email')
                ->required(false)
                ->schema(
                    Schema::string()
                        ->example("nikko")
                ),
            // Parameter::query()
            //     ->name('filter[email]')
            //     ->description('Search by email')
            //     ->required(false)
            //     ->schema(
            //         Schema::string()
            //             ->example("user@gmail.com")
            //     ),

            Parameter::query()
                ->name('filter[type]')
                ->description('Search by type')
                ->required(false)
                ->schema(
                    Schema::string('type')
                        ->enum(UserType::getValues())
                ),
        ];

        return $filters;
    }
}
