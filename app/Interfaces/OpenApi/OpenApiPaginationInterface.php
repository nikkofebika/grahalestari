<?php

namespace App\Interfaces\OpenApi;

use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;

interface OpenApiPaginationInterface
{
    public function links(): ?Schema;
    public function meta(): ?Schema;
}
