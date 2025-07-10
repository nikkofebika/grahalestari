<?php

namespace App\OpenApi\Responses;

use GoldSpecDigital\ObjectOrientedOAS\Objects\MediaType;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Response;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;
use Vyuldashev\LaravelOpenApi\Factories\ResponseFactory;

/**
 * @method Schema|null meta()
 * @method Schema|null links()
 * @method Schema|null query()
 */
abstract class BaseResponseFactory extends ResponseFactory
{
    protected string $description = 'Successful response';
    protected int $statusCode = 200;

    abstract protected function data(): Schema;

    public function build(): Response
    {
        $schemas[] = $this->data();

        if (method_exists($this, 'meta') && $meta = $this->meta()) {
            $schemas[] = $meta;
        }

        if (method_exists($this, 'links') && $links = $this->links()) {
            $schemas[] = $links;
        }

        if (method_exists($this, 'query') && $query = $this->query()) {
            $schemas[] = $query;
        }

        // Hapus null values (kalau ada method return null)
        $schemas = array_filter($schemas);

        return Response::ok(static::class)
            ->statusCode($this->statusCode)
            ->description($this->description)
            ->content(
                MediaType::json()->schema(
                    Schema::object()->properties(...$schemas)
                )
            );
    }
}
