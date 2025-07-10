<?php

namespace App\OpenApi\Parameters;

use App\OpenApi\Parameters\Header\ApplicationJsonHeaderParameters;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Parameter;
use Vyuldashev\LaravelOpenApi\Factories\ParametersFactory;

abstract class BaseParameterFactoryParameters extends ParametersFactory
{
    // protected bool $withAuthHeader = true;
    protected bool $withJsonHeader = true;

    abstract protected function data(): array;

    /**
     * @return Parameter[]
     */
    public function build(): array
    {
        $properties = [];

        // if ($this->withAuthHeader) {
        //     $properties = array_merge($properties, (new AuthBearerHeaderParameters())->build());
        // }

        if ($this->withJsonHeader) {
            $properties = array_merge($properties, (new ApplicationJsonHeaderParameters())->build());
        }

        return array_merge($this->data(), $properties);
    }
}
