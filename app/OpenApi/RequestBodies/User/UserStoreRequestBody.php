<?php

namespace App\OpenApi\RequestBodies\User;

use App\Enums\Education;
use App\Enums\Gender;
use App\Enums\MaritalStatus;
use App\Enums\OpenApiExample;
use App\Enums\Religion;
use App\Enums\UserType;
use GoldSpecDigital\ObjectOrientedOAS\Objects\MediaType;
use GoldSpecDigital\ObjectOrientedOAS\Objects\RequestBody;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;
use Vyuldashev\LaravelOpenApi\Factories\RequestBodyFactory;

class UserStoreRequestBody extends RequestBodyFactory
{
    public function build(): RequestBody
    {
        return RequestBody::create()
            ->content(
                MediaType::json()->schema(
                    Schema::object()
                        ->required(
                            'tenant_id',
                            'name',
                            'email',
                            'password',
                            'type',
                        )
                        ->properties(
                            Schema::integer('tenant_id')
                                ->example(1),
                            Schema::string('name')
                                ->example(OpenApiExample::NAME->value),
                            Schema::string('email')
                                ->example(OpenApiExample::EMAIL->value),
                            Schema::string('password')
                                ->format(Schema::FORMAT_PASSWORD)
                                ->example(OpenApiExample::PASSWORD->value),
                            Schema::string('type')
                                ->enum(UserType::getValues())
                                ->example(OpenApiExample::USER_TYPE->value),
                            Schema::string('no_kk')
                                ->nullable(true),
                            Schema::string('no_ktp')
                                ->nullable(true),
                            Schema::string('phone')
                                ->minLength(8)
                                ->maxLength(15)
                                ->nullable(true),
                            Schema::string('birth_date')
                                ->format(Schema::FORMAT_DATE)
                                ->nullable(true),
                            Schema::string('birth_place')
                                ->nullable(true),
                            Schema::string('gender')
                                ->enum(Gender::getValues())
                                ->example(Gender::MALE->value)
                                ->nullable(true),
                            Schema::string('religion')
                                ->enum(Religion::getValues())
                                ->example(Religion::ISLAM->value)
                                ->nullable(true),
                            Schema::string('marital_status')
                                ->enum(MaritalStatus::getValues())
                                ->example(MaritalStatus::SINGLE->value)
                                ->nullable(true),
                            Schema::string('education')
                                ->enum(Education::getValues())
                                ->example(Education::S1->value)
                                ->nullable(true),
                            Schema::string('job')
                                ->nullable(true),
                            Schema::string('address')
                                ->nullable(true),
                        )
                )
            );
    }
}
