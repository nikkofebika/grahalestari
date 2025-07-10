<?php

namespace App\Http\Resources;

use App\Helpers\Permission\PermissionResolver;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

abstract class BaseResource extends JsonResource
{
    /**
     * Transform the resource into an array with optional permissions.
     *
     * @param Request $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        if ($request->boolean('with_permission', false)) {
            $data['permissions'] = PermissionResolver::forItem(
                $this->resource,
                // $this->resolvePermissionActions($request)
            );
        }

        return $data;
    }

    /**
     * Resolve which permission actions to check from the request.
     *
     * @param Request $request
     * @return array<int, string>
     */
    protected function resolvePermissionActions(Request $request): array
    {
        return $request->input('permission_actions', ['view', 'update', 'delete']);
    }
}
