<?php

namespace App\OpenApi\Responses\Auth;

use App\OpenApi\Schemas\Auth\TokenSchema;
use GoldSpecDigital\ObjectOrientedOAS\Objects\MediaType;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Response;
use Vyuldashev\LaravelOpenApi\Factories\ResponseFactory;

class TokenResponse extends ResponseFactory
{
    public function build(): Response
    {
        return Response::create()
            ->statusCode(200)
            ->description('Successful response')
            ->content(
                MediaType::json()->schema(
                    TokenSchema::ref()
                )
            );
    }
}
