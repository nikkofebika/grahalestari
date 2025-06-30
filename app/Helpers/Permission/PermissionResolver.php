<?php

namespace App\Helpers\Permission;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Gate;

class PermissionResolver
{
    /**
     * Resolve policies dynamically for model class (e.g., for Create button).
     *
     * @param class-string $modelClass
     * @param array $actions
     * @return array<string, bool>
     */
    public static function forActions(string $modelClass, ?array $actions = ['create']): array
    {
        $permissions = [];

        foreach ($actions as $action) {
            $permissions[$action] = Gate::check($action, $modelClass);
        }

        return $permissions;
    }

    /**
     * Resolve policies for each model instance (by ID).
     *
     * @param iterable $items (should have ->id)
     * @param array $actions
     * @return array<int|string, array<string, bool>>
     */
    public static function forCollection(Collection $items, ?array $actions = ['view', 'update', 'delete']): array
    {
        $permissions = [];

        foreach ($items as $item) {
            $entry = [];

            foreach ($actions as $action) {
                $entry[$action] = Gate::check($action, $item);
            }

            $permissions[$item->id] = $entry;
        }

        return $permissions;
    }
}
