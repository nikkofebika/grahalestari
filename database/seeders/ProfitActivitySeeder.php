<?php

namespace Database\Seeders;

use App\Models\Coa;
use App\Models\ProfitActivityCategory;
use App\Models\Tenant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProfitActivitySeeder extends Seeder
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
            ProfitActivityCategory::withoutEvents(fn() => ProfitActivityCategory::withoutGlobalScopes()->create([
                'tenant_id' => $tenant->id,
                'debit_coa_id' => $kas->id,
                'credit_coa_id' => $pendapatan->id,
                'name' => 'Uang Kerompong - ' . $tenantName,
                'description' => 'Uang Kerompong',
            ]));
        });
    }
}
