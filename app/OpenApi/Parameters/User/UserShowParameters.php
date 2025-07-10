<?php

namespace App\OpenApi\Parameters\User;

use App\Enums\OpenApiExample;
use App\OpenApi\Parameters\BaseParameterFactoryParameters;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Parameter;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;

class UserShowParameters extends BaseParameterFactoryParameters
{
    /**
     * @return Parameter[]
     */
    public function data(): array
    {
        return [
            Parameter::path()
                ->name('user')
                ->description('User id')
                ->required(true)
                ->schema(Schema::integer()->example(1)),
        ];
    }
}
