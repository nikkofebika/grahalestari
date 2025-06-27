<?php

namespace App\Interfaces\Controllers;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

interface HasSearch
{
    public function search(): AnonymousResourceCollection;
}
