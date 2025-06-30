<?php

namespace App\Http\Services\Role;

use App\Models\Permission;

class RolePermissionService
{
    public static function getAllPermissions()
    {
        return collect(static::permissions())
            ->mergeRecursive(static::administratorPermissions());
    }

    public static function getPermissionsData(?array $persmissions = null): array
    {
        if (!is_null($persmissions) && is_array($persmissions) && count($persmissions) > 0) {
            $persmissions = self::getAllPermissions();
        }

        $data = [];
        foreach ($persmissions as $key => $persmission) {
            if (is_array($persmission)) {
                $data[] = $key;
                foreach ($persmission as $key => $persmission) {
                    if (is_array($persmission)) {
                        $data[] = $key;

                        foreach ($persmission as $p) {
                            $data[] = $p;
                        }
                    } else {
                        $data[] = $persmission;
                    }
                }
            } else {
                $data[] = $persmission;
            }
        }

        return $data;
    }

    public static function permissions(): array
    {
        return [
            'user_access' => [
                // 'user_read',
                'user_create',
                'user_edit',
                'user_delete',
            ],
            'role_access' => [
                // 'role_read',
                'role_create',
                'role_edit',
                'role_delete',
            ],
            'tenant_access' => [
                // 'tenant_read',
                'tenant_create',
                'tenant_edit',
                'tenant_delete',
            ],
        ];
    }

    public static function administratorPermissions(): array
    {
        return [
            // 'user_access' => [
            //     'user_read',
            //     'user_create',
            //     'user_edit',
            //     'user_delete',
            //     'user_set_supervisor',
            //     'can_read_all_users',
            // ],
            // 'tenant_access' => [
            //     'tenant_read',
            //     'tenant_create',
            //     'tenant_edit',
            //     'tenant_delete',
            // ],
        ];
    }

    public static function userPermissions(): array
    {
        return [
            'user_access' => [
                'user_read',
                // 'user_create',
                // 'user_edit',
                // 'user_delete',
            ],
        ];
    }

    public static function generateChilds(Permission $headSubPermissions, array $subPermissions)
    {
        collect($subPermissions)->each(function ($permission, $key) use ($headSubPermissions) {
            if (is_array($permission)) {
                $hsp = Permission::firstOrCreate([
                    'name' => $key,
                    // 'guard_name' => $guard,
                    'parent_id' => $headSubPermissions->id,
                ]);

                self::generateChilds($hsp, $permission);
            } else {
                $hsp = Permission::firstOrCreate([
                    'name' => $permission,
                    // 'guard_name' => $guard,
                    'parent_id' => $headSubPermissions->id,
                ]);
            }
        });
    }

    /**
     * filter permissions ids
     */
    // public static function getPermissionNames(array $permissionIds = []): array
    // {
    //     $pids = [];
    //     if (!is_array($permissionIds) || count($permissionIds) <= 0) {
    //         return $pids;
    //     }

    //     foreach ($permissionIds as $id) {
    //         $permission = Permission::find($id, ['id', 'name']);
    //         if ($permission) {
    //             $pids[] = $permission->name;

    //             $permissionNames = self::getRelatedPermissions($permission->name);
    //             array_push($pids, ...$permissionNames);
    //         }
    //     }

    //     return $pids;
    // }

    // public static function getRelatedPermissions(string $permission): array
    // {
    //     return match ($permission) {
    //         'receive_order_access' => ['stock_read'],
    //         'stock_access' => ['product_category_read', 'product_brand_read', 'warehouse_read'],
    //         'sales_order_access' => ['product_unit_read', 'warehouse_read', 'user_access'],
    //         'delivery_order_access' => ['sales_order_read'],
    //         'product_access' => ['product_category_read', 'product_brand_read', 'product_unit_read'],
    //         'user_access' => ['role_read'],
    //         default => [],
    //     };
    // }

    public static function getMyPermissions()
    {
        /** @var \App\Models\User $user */
        $user = auth()->user();
        $allPermissions = [];
        if ($user->is_super_admin || $user->is_admin) {
            foreach (self::getAllPermissions() as $parent => $childs) {
                if (is_array($childs)) {
                    $allPermissions[$parent][$parent] = true;
                    foreach ($childs as $child) {
                        $allPermissions[$parent][$child] = true;
                    }
                } else {
                    $allPermissions[$childs] = true;
                }
            }
        } else {
            $myPermissions = $user?->getAllPermissions()?->pluck('name') ?? collect([]);
            foreach (self::getAllPermissions() as $parent => $childs) {
                if (is_array($childs)) {
                    $allPermissions[$parent][$parent] = $myPermissions->search($parent) === false ? false : true;
                    foreach ($childs as $child) {
                        $allPermissions[$parent][$child] = $myPermissions->search($child) === false ? false : true;
                    }
                } else {
                    $allPermissions[$childs] = $myPermissions->search($childs) === false ? false : true;
                }
            }
        }

        $allPermissions['navbar']['company']['user_management_access'] = false;
        $allPermissions['navbar']['company']['setting_access'] = false;
        $allPermissions['navbar']['company']['payroll_access'] = false;
        // $allPermissions['navbar']['company']['update_payroll_component_access'] = false;

        foreach ($allPermissions as $parent => $childs) {
            foreach ($childs as $key => $value) {
                if (in_array($key, ['tenant_access', 'company_access', 'branch_access', 'role_access', 'user_access']) && $value === true) $allPermissions['navbar']['company']['user_management_access'] = true;
                if (in_array($key, ['payroll_schedule_access', 'cut_off_and_tax_setting_access', 'payroll_component_access', 'run_payroll_access', 'pro_rate_setting_access']) && $value === true) $allPermissions['navbar']['company']['payroll_access'] = true;
                if (in_array($key, ['company_access', 'time_management_access', 'timeoff_regulation_access']) && $value === true) $allPermissions['navbar']['company']['setting_access'] = true;
            }
        }

        return $allPermissions;
    }
}

// related permission
// user_read = branch_read


// additional permissions :
// user_set_supervisor
// update_payroll_component_access
