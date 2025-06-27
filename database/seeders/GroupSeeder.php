<?php

namespace Database\Seeders;

use App\Models\Group;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $parent = Group::create([
            'parent_id' => null,
            'leader_id' => null,
            'province_id' => 36,
            'province_name' => 'Banten',
            'city_id' => 3603,
            'city_name' => 'Kab. Tangerang',
            'district_id' => 360319,
            'district_name' => 'Panongan',
            'village_id' => 3603191002,
            'village_name' => 'Mekar Bakti',
            'name' => 'RW 08 - Graha Lestari',
            'address' => 'Graha Lestari Citra Raya Kab Tangerang',
            'latitude' => '-6.2529363',
            'longitude' => '106.5135358',
            'postal_code' => '15710',
        ]);

        for ($i = 1; $i < 7; $i++) {
            $parent->childs()->create([
                'province_id' => $parent->province_id,
                'city_id' => $parent->city_id,
                'district_id' => $parent->district_id,
                'village_id' => $parent->village_id,
                'name' => 'RT 0' . $i . ' - Graha Lestari',
                'address' => $parent->address,
                'latitude' => $parent->latitude,
                'longitude' => $parent->longitude,
                'postal_code' => $parent->postal_code,
            ]);
        }
    }
}
