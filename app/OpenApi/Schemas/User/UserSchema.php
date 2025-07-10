<?php

namespace App\OpenApi\Schemas\User;

use App\Enums\OpenApiExample;
use App\Enums\UserType;
use GoldSpecDigital\ObjectOrientedOAS\Contracts\SchemaContract;
use GoldSpecDigital\ObjectOrientedOAS\Objects\AllOf;
use GoldSpecDigital\ObjectOrientedOAS\Objects\AnyOf;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Not;
use GoldSpecDigital\ObjectOrientedOAS\Objects\OneOf;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;
use Vyuldashev\LaravelOpenApi\Contracts\Reusable;
use Vyuldashev\LaravelOpenApi\Factories\SchemaFactory;

class UserSchema extends SchemaFactory implements Reusable
{
    /**
     * @return AllOf|OneOf|AnyOf|Not|Schema
     */
    public function build(): SchemaContract
    {
        return Schema::object('User')
            ->required(
                'id',
                'group_id',
                'tenant_id',
                'name',
                'email',
                'type',
            )
            ->properties(
                Schema::integer('id')
                    ->example((int)OpenApiExample::ID->value),
                Schema::integer('group_id')
                    ->nullable(true)
                    ->example((int)OpenApiExample::ID->value),
                Schema::integer('tenant_id')
                    ->nullable(true)
                    ->example((int)OpenApiExample::ID->value),
                Schema::string('name')
                    ->example(OpenApiExample::NAME->value),
                Schema::string('email')
                    ->example(OpenApiExample::EMAIL->value),
                Schema::string('email_verified_at')
                    ->format(Schema::FORMAT_DATE_TIME)
                    ->nullable(true)
                    ->example(OpenApiExample::DATETIME->value),
                Schema::string('remember_token')
                    ->nullable(true)
                    ->example("osifng024dif"),
                Schema::string('type')
                    ->enum(UserType::getValues())
                    ->example(OpenApiExample::USER_TYPE->value),
                Schema::string('created_at')
                    ->format(Schema::FORMAT_DATE_TIME)
                    ->example(OpenApiExample::DATETIME->value),
                Schema::string('updated_at')
                    ->format(Schema::FORMAT_DATE_TIME)
                    ->example(OpenApiExample::DATETIME->value),
                Schema::integer('created_by_id')
                    ->nullable(true)
                    ->example((int)OpenApiExample::ID->value),
                Schema::integer('updated_by_id')
                    ->nullable(true)
                    ->example((int)OpenApiExample::ID->value),
                Schema::integer('deleted_by_id')
                    ->nullable(true)
                    ->example((int)OpenApiExample::ID->value),
                Schema::string('deleted_at')
                    ->format(Schema::FORMAT_DATE_TIME)
                    ->nullable(true)
                    ->example(OpenApiExample::DATETIME->value),
            );
    }
}
