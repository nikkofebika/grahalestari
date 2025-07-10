<?php

namespace App\OpenApi\RequestBodies\Auth;

use GoldSpecDigital\ObjectOrientedOAS\Objects\MediaType;
use GoldSpecDigital\ObjectOrientedOAS\Objects\RequestBody;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;
use Vyuldashev\LaravelOpenApi\Factories\RequestBodyFactory;

class TokenRequestBody extends RequestBodyFactory
{
    public function build(): RequestBody
    {
        return RequestBody::create()
            ->content(
                MediaType::json()->schema(
                    Schema::object()
                        ->properties(
                            Schema::string('email')
                                ->example("admin@gmail.com"),
                            Schema::string('password')
                                ->format(Schema::FORMAT_PASSWORD)
                                ->example('password'),
                        )
                        ->required('email', 'password')
                )
            );
    }
}
