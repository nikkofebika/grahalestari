<?php

namespace App\OpenApi\Schemas\Pagination;

use GoldSpecDigital\ObjectOrientedOAS\Contracts\SchemaContract;
use GoldSpecDigital\ObjectOrientedOAS\Objects\AllOf;
use GoldSpecDigital\ObjectOrientedOAS\Objects\AnyOf;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Not;
use GoldSpecDigital\ObjectOrientedOAS\Objects\OneOf;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;
use Vyuldashev\LaravelOpenApi\Contracts\Reusable;
use Vyuldashev\LaravelOpenApi\Factories\SchemaFactory;

class MetaSchema extends SchemaFactory implements Reusable
{
    /**
     * @return AllOf|OneOf|AnyOf|Not|Schema
     */
    public function build(): SchemaContract
    {
        return Schema::object('meta')
            ->properties(
                Schema::integer('current_page')->example(1),
                Schema::string('current_page_url')->example('http://localhost:8000/api/users?page=1'),
                Schema::integer('from')->example(1),
                Schema::string('path')->example('http://localhost:8000/api/users'),
                Schema::integer('per_page')->example(15),
                Schema::integer('to')->example(15),
            );


        // "current_page": 1,
        // "current_page_url": "http://localhost:8000/api/users?page=1",
        // "from": 1,
        // "path": "http://localhost:8000/api/users",
        // "per_page": 15,
        // "to": 15
    }
}
