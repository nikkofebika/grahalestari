<?php

namespace App\Contracts;

interface HasPermissionAttributesInterface
{
    /**
     * Harus mengembalikan array permission methods
     * Contoh: ['viewRt', 'updateRt'] atau ['viewRt' => 'can_view']
     */
    public function getPermissionMethods(): array;

    /**
     * Harus mengembalikan array hasil pengecekan permission
     */
    public function getPermissionsAttribute(): array;
}
