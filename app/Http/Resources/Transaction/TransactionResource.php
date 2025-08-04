<?php

namespace App\Http\Resources\Transaction;

use App\Helpers\Permission\PermissionResolver;
use App\Http\Resources\DefaultResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            ...parent::toArray($request),
            'details' => DefaultResource::collection($this->whenLoaded('details')),
            'detail' => $this->detail,
        ];

        if (!$request->expectsJson() || $request->boolean('with_permission', false)) {
            $data['permissions'] = PermissionResolver::forItem($this->resource);
        }

        return $data;
    }
}
