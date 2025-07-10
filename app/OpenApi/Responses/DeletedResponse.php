<?php

namespace App\OpenApi\Responses;

use App\OpenApi\Schemas\GeneralMessageSchema;
use GoldSpecDigital\ObjectOrientedOAS\Objects\MediaType;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Response;
use Vyuldashev\LaravelOpenApi\Factories\ResponseFactory;

class DeletedResponse extends ResponseFactory
{
    public function build(): Response
    {
        return Response::ok()
            ->description('Data deleted successfully')
            ->content(
                MediaType::json()->schema(
                    GeneralMessageSchema::ref()
                )
            );
    }
}
