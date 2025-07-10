<?php

namespace App\Http\Resources;

use App\Helpers\Permission\PermissionResolver;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DefaultResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);
        if (!$request->expectsJson() || $request->boolean('with_permission', false)) {
            $data['permissions'] = PermissionResolver::forItem($this->resource);
        }

        return $data;
    }
}
