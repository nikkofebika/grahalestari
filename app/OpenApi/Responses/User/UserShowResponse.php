<?php

namespace App\OpenApi\Responses\User;

use App\OpenApi\Responses\BaseResponseFactory;
use App\OpenApi\Schemas\User\UserSchema;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;

class UserShowResponse extends BaseResponseFactory
{
    public function data(): Schema
    {
        return UserSchema::ref("data");
    }
}
