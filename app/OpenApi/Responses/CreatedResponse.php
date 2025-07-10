<?php

namespace App\OpenApi\Responses;

use App\OpenApi\Schemas\GeneralMessageSchema;
use GoldSpecDigital\ObjectOrientedOAS\Objects\MediaType;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Response;
use Vyuldashev\LaravelOpenApi\Factories\ResponseFactory;

class CreatedResponse extends ResponseFactory
{
    public function build(): Response
    {
        return Response::created()
            ->description('Data created successfully')
            ->content(
                MediaType::json()->schema(
                    GeneralMessageSchema::ref()
                )
            );
    }
}
