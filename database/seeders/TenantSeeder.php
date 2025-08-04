<?php

namespace Database\Seeders;

use App\Enums\UserType;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TenantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userLeader = User::factory()->create([
            'name' => 'Admin RW',
            'email' => 'admin.rw@gmail.com',
            'type' => UserType::ADMIN_RW,
        ]);

        $parent = Tenant::create([
            'parent_id' => null,
            'leader_id' => $userLeader->id,
            'province_id' => 36,
            'province_name' => 'Banten',
            'city_id' => 3603,
            'city_name' => 'Kab. Tangerang',
            'district_id' => 360319,
            'district_name' => 'Panongan',
            'village_id' => 3603191002,
            'village_name' => 'Mekar Bakti',
            'postal_code' => '15710',
            'name' => 'RW 08 - Graha Lestari',
            'number' => 8,
            'address' => 'Graha Lestari Citra Raya Kab Tangerang',
            'latitude' => '-6.2529363',
            'longitude' => '106.5135358',
        ]);

        for ($i = 1; $i < 7; $i++) {
            $user = User::factory()->create([
                'name' => 'Admin RT ' . $i,
                'email' => 'admin.rt' . $i . '@gmail.com',
                'type' => UserType::ADMIN_RT,
            ]);

            $child = $parent->childs()->create([
                'leader_id' => $user->id,
                'name' => 'RT 0' . $i . ' - Graha Lestari',
                'number' => $i,
                'address' => $parent->address,
                'latitude' => $parent->latitude,
                'longitude' => $parent->longitude,
            ]);

            $user->update([
                'group_id' => $parent->id,
                'tenant_id' => $child->id,
            ]);
        }

        $userLeader->update([
            'group_id' => $parent->id,
            'tenant_id' => $child->id,
        ]);

        $userLeader = User::factory()->create([
            'name' => 'Admin RW Konoha',
            'email' => 'admin.konoha@gmail.com',
            'type' => UserType::ADMIN_RW,
        ]);

        $parent = Tenant::create([
            'parent_id' => null,
            'leader_id' => $userLeader->id,
            'province_id' => 36,
            'province_name' => 'Banten',
            'city_id' => 3603,
            'city_name' => 'Kab. Tangerang',
            'district_id' => 360319,
            'district_name' => 'Panongan',
            'village_id' => 3603191002,
            'village_name' => 'Mekar Bakti',
            'postal_code' => '15710',
            'name' => 'RW Konoha',
            'number' => 1,
            'address' => 'Kp. Konoha',
            'latitude' => '-6.2529363',
            'longitude' => '106.5135358',
        ]);

        for ($i = 1; $i < 7; $i++) {
            $user = User::factory()->create([
                'name' => 'Admin RT ' . $i . ' Konoha',
                'email' => 'admin.konoha' . $i . '@gmail.com',
                'type' => UserType::ADMIN_RT,
            ]);

            $child = $parent->childs()->create([
                'leader_id' => $user->id,
                'name' => 'RT 0' . $i . ' - Konoha',
                'number' => $i,
                'address' => $parent->address,
                'latitude' => $parent->latitude,
                'longitude' => $parent->longitude,
            ]);

            $user->update([
                'group_id' => $parent->id,
                'tenant_id' => $child->id,
            ]);
        }

        $userLeader->update([
            'group_id' => $parent->id,
            'tenant_id' => $child->id,
        ]);
    }
}
