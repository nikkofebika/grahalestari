<?php

namespace Database\Seeders;

use App\Models\Coa;
use App\Models\CitizenFeeCategory;
use App\Models\Tenant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CitizenFeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tenant::withoutGlobalScopes()->get()->each(function ($tenant) {
            $tenantName = str_replace([' - Graha Lestari', ' - Konoha', '0'], '', $tenant->name);
            $kas = Coa::withoutGlobalScopes()->where('account_name', 'KAS ' . $tenantName)->firstOrFail();
            $pendapatan = Coa::withoutGlobalScopes()->where('account_name', 'Penjualan Barang Bekas ' . $tenantName)->firstOrFail();
            CitizenFeeCategory::withoutEvents(fn() => CitizenFeeCategory::withoutGlobalScopes()->create([
                'tenant_id' => $tenant->id,
                'debit_coa_id' => $kas->id,
                'credit_coa_id' => $pendapatan->id,
                'name' => 'Fix Amount - ' . $tenantName,
                'fix_amount' => 10000,
                'description' => 'Fix Amount',
            ]));
            CitizenFeeCategory::withoutEvents(fn() => CitizenFeeCategory::withoutGlobalScopes()->create([
                'tenant_id' => $tenant->id,
                'debit_coa_id' => $kas->id,
                'credit_coa_id' => $pendapatan->id,
                'name' => 'BEBASSSSS - ' . $tenantName,
                'description' => 'BEBASSSSS',
            ]));
        });
    }
}
