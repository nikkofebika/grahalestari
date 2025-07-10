<?php

namespace App\OpenApi\Parameters\Header;

use GoldSpecDigital\ObjectOrientedOAS\Objects\Parameter;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;
use Vyuldashev\LaravelOpenApi\Factories\ParametersFactory;

class AuthBearerHeaderParameters extends ParametersFactory
{
    /**
     * @return Parameter[]
     */
    public function build(): array
    {
        return [
            Parameter::header()
                ->name('Authorization')
                ->description('Tokenmu disini')
                ->required(true)
                ->schema(
                    Schema::string()->example('Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...')
                ),
        ];
    }
}
