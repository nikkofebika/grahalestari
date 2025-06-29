<?php

namespace App\Traits;

use Illuminate\Support\Str;
use App\Contracts\HasPermissionAttributesInterface;

trait HasPermissionAttributes
{
    public function getPermissionsAttribute(): array
    {
        $user = auth()->user();

        if (! $user) {
            return [];
        }

        // Pastikan model ini implement interface
        if (! $this instanceof HasPermissionAttributesInterface) {
            throw new \LogicException(get_class($this) . ' should implement HasPermissionAttributesInterface.');
        }

        $methods = $this->getPermissionMethods();
        $permissions = [];

        foreach ($methods as $method => $key) {
            if (is_int($method)) {
                $method = $key;
                $key = Str::snake(str_replace(class_basename($this), '', $method));
            }

            $permissions[$key] = $user->can($method, $this);
        }

        return $permissions;
    }
}
