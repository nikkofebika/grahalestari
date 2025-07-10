<?php

namespace App\Traits\OpenApi;

use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;

trait SimplePaginationOpenApi
{
    public function links(): ?Schema
    {
        return \App\OpenApi\Schemas\Pagination\LinksSchema::ref("links");
    }

    public function meta(): ?Schema
    {
        return \App\OpenApi\Schemas\Pagination\MetaSchema::ref("meta");
    }
}
