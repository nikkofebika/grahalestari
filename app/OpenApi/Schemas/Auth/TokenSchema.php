<?php

namespace App\OpenApi\Schemas\Auth;

use GoldSpecDigital\ObjectOrientedOAS\Contracts\SchemaContract;
use GoldSpecDigital\ObjectOrientedOAS\Objects\AllOf;
use GoldSpecDigital\ObjectOrientedOAS\Objects\AnyOf;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Not;
use GoldSpecDigital\ObjectOrientedOAS\Objects\OneOf;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;
use Vyuldashev\LaravelOpenApi\Contracts\Reusable;
use Vyuldashev\LaravelOpenApi\Factories\SchemaFactory;

class TokenSchema extends SchemaFactory implements Reusable
{
    /**
     * @return AllOf|OneOf|AnyOf|Not|Schema
     */
    public function build(): SchemaContract
    {
        return Schema::object("TokenSchema")
            ->properties(
                Schema::object("data")
                    ->properties(
                        Schema::string('access_token')
                            ->description('Token JWT yang akan digunakan untuk autentikasi.')
                            ->example('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...'),

                        Schema::string('token_type')
                            ->description('Tipe token.')
                            ->example('bearer'),

                        Schema::integer('expires_in')
                            ->description('Waktu kedaluwarsa token dalam detik.')
                            ->example(3600)
                    )
            );
    }
}
