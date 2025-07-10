<?php

namespace App\OpenApi\Responses\User;

use App\Interfaces\OpenApi\OpenApiPaginationInterface;
use App\OpenApi\Responses\BaseResponseFactory;
use App\OpenApi\Schemas\User\UserSchema;
use App\Traits\OpenApi\SimplePaginationOpenApi;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;

class UserIndexResponse extends BaseResponseFactory implements OpenApiPaginationInterface
{
    use SimplePaginationOpenApi;

    public function data(): Schema
    {
        return Schema::array("data")->items(UserSchema::ref());
    }
}
