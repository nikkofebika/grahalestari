<?php

namespace App\OpenApi\Parameters\Header;

use GoldSpecDigital\ObjectOrientedOAS\Objects\Parameter;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;
use Vyuldashev\LaravelOpenApi\Factories\ParametersFactory;

class ApplicationJsonHeaderParameters extends ParametersFactory
{
    /**
     * @return Parameter[]
     */
    public function build(): array
    {
        return [
            Parameter::header()
                ->name('Accept')
                ->description('API call should for json response')
                ->required(true)
                ->schema(
                    Schema::string()->example('application/json')
                ),

            Parameter::header()
                ->name('Content-Type')
                ->description('API call should be json data')
                ->required(true)
                ->schema(
                    Schema::string()->example('application/json')
                ),
        ];
    }
}
