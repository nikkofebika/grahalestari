<?php

namespace Database\Seeders;

use App\Enums\NormalBalance;
use App\Http\Services\Coa\CoaService;
use App\Models\Coa;
use App\Models\Rw;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CoaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = now();

        $coaService = app(CoaService::class);

        collect([
            [
                'account_number' => '1xxx',
                'account_name' => 'HARTA / KAS',
                'normal_balance' => NormalBalance::DEBIT,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            // [
            //     'account_number' => '2xxx',
            //     'account_name' => 'KEWAJIBAN / HUTANG',
            //     'normal_balance' => 'credit',
            //     'created_at' =>$now,
            //     'updated_at' =>$now,
            // ],
            // [
            //     'account_number' => '3xxx',
            //     'account_name' => 'MODAL / AKTIVA',
            //     'normal_balance' => 'credit',
            //     'created_at' =>$now,
            //     'updated_at' =>$now,
            // ],
            [
                'account_number' => '4xxx',
                'account_name' => 'PENDAPATAN / PENERIMAAN',
                'normal_balance' => NormalBalance::CREDIT,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'account_number' => '5xxx',
                'account_name' => 'BIAYA / BEBAN',
                'normal_balance' => NormalBalance::DEBIT,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ])->each(function ($coa) use ($coaService) {
            // $coaService->create($coa);
            Coa::withoutEvents(fn() => Coa::withoutGlobalScopes()->create($coa));
        });

        Rw::withoutGlobalScopes()->whereNull('parent_id')->with('childs', fn($q) => $q->withoutGlobalScopes())->get()->each(function ($rw) use ($now) {
            // HARTA / KAS
            collect([
                [
                    'tenant_id' => $rw->id,
                    'parent_id' => 1,
                    'account_number' => '1001',
                    'account_name' => 'KAS RW ' . $rw->number,
                    'normal_balance' => NormalBalance::DEBIT,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                [
                    'tenant_id' => $rw->id,
                    'parent_id' => 2,
                    'account_number' => '4001',
                    'account_name' => 'Iuran Warga RW ' . $rw->number,
                    'normal_balance' => NormalBalance::CREDIT,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                [
                    'tenant_id' => $rw->id,
                    'parent_id' => 2,
                    'account_number' => '4002',
                    'account_name' => 'Bantuan Pemerintah RW ' . $rw->number,
                    'normal_balance' => NormalBalance::CREDIT,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                [
                    'tenant_id' => $rw->id,
                    'parent_id' => 2,
                    'account_number' => '4003',
                    'account_name' => 'Penjualan Barang Bekas RW ' . $rw->number,
                    'normal_balance' => NormalBalance::CREDIT,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                [
                    'tenant_id' => $rw->id,
                    'parent_id' => 3,
                    'account_number' => '5001',
                    'account_name' => 'Biaya Kematian Warga RW ' . $rw->number,
                    'normal_balance' => NormalBalance::DEBIT,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                [
                    'tenant_id' => $rw->id,
                    'parent_id' => 3,
                    'account_number' => '5002',
                    'account_name' => 'Biaya Kegiatan Warga RW ' . $rw->number,
                    'normal_balance' => NormalBalance::DEBIT,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                [
                    'tenant_id' => $rw->id,
                    'parent_id' => 3,
                    'account_number' => '5003',
                    'account_name' => 'Biaya Perlengkapan RW ' . $rw->number,
                    'normal_balance' => NormalBalance::DEBIT,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                [
                    'tenant_id' => $rw->id,
                    'parent_id' => 3,
                    'account_number' => '5004',
                    'account_name' => 'Biaya Administrasi RW ' . $rw->number,
                    'normal_balance' => NormalBalance::DEBIT,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
            ])->each(function ($coa) {
                Coa::withoutEvents(fn() => Coa::withoutGlobalScopes()->create($coa));
            });

            $rw->childs->each(function ($rt) use ($now) {
                collect([
                    [
                        'tenant_id' => $rt->id,
                        'parent_id' => 1,
                        'account_number' => '1001',
                        'account_name' => 'KAS RT ' . $rt->number,
                        'normal_balance' => NormalBalance::DEBIT,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ],
                    [
                        'tenant_id' => $rt->id,
                        'parent_id' => 2,
                        'account_number' => '4001',
                        'account_name' => 'Iuran Warga RT ' . $rt->number,
                        'normal_balance' => NormalBalance::CREDIT,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ],
                    [
                        'tenant_id' => $rt->id,
                        'parent_id' => 2,
                        'account_number' => '4002',
                        'account_name' => 'Bantuan Pemerintah RT ' . $rt->number,
                        'normal_balance' => NormalBalance::CREDIT,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ],
                    [
                        'tenant_id' => $rt->id,
                        'parent_id' => 2,
                        'account_number' => '4003',
                        'account_name' => 'Penjualan Barang Bekas RT ' . $rt->number,
                        'normal_balance' => NormalBalance::CREDIT,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ],
                    [
                        'tenant_id' => $rt->id,
                        'parent_id' => 3,
                        'account_number' => '5001',
                        'account_name' => 'Biaya Kematian Warga RT ' . $rt->number,
                        'normal_balance' => NormalBalance::DEBIT,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ],
                    [
                        'tenant_id' => $rt->id,
                        'parent_id' => 3,
                        'account_number' => '5002',
                        'account_name' => 'Biaya Kegiatan Warga RT ' . $rt->number,
                        'normal_balance' => NormalBalance::DEBIT,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ],
                    [
                        'tenant_id' => $rt->id,
                        'parent_id' => 3,
                        'account_number' => '5003',
                        'account_name' => 'Biaya Perlengkapan RT ' . $rt->number,
                        'normal_balance' => NormalBalance::DEBIT,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ],
                    [
                        'tenant_id' => $rt->id,
                        'parent_id' => 3,
                        'account_number' => '5004',
                        'account_name' => 'Biaya Administrasi RT ' . $rt->number,
                        'normal_balance' => NormalBalance::DEBIT,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ],
                ])->each(function ($coa) {
                    Coa::withoutEvents(fn() => Coa::withoutGlobalScopes()->create($coa));
                });
            });
        });
    }
}
