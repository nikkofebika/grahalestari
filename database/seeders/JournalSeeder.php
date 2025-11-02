<?php

namespace Database\Seeders;

use App\Enums\NormalBalance;
use App\Http\Services\Journal\JournalService;
use App\Models\Coa;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class JournalSeeder extends Seeder
{
    public function __construct(protected JournalService $journalService) {}
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Tetapkan Tenant ID yang diminta
        $tenantId = 2;

        // 1. Ambil COA ID yang diperlukan (Pastikan CoaSeeder sudah jalan)
        $cashCoa = Coa::withoutGlobalScopes()->where('tenant_id', $tenantId)->where('account_number', '1001')->first(); // Kas

        // Kumpulan COA Pemasukan
        $iuranWargaCoa = Coa::withoutGlobalScopes()->where('tenant_id', $tenantId)->where('account_number', '4001')->first(); // Iuran Warga
        $bantuanPemerintahCoa = Coa::withoutGlobalScopes()->where('tenant_id', $tenantId)->where('account_number', '4002')->first(); // Bantuan Pemerintah
        $penjualanBarangBekasCoa = Coa::withoutGlobalScopes()->where('tenant_id', $tenantId)->where('account_number', '4003')->first(); // Penjualan barang bekas

        // Kumpulan COA Pengeluaran
        $biayaKematianCoa = Coa::withoutGlobalScopes()->where('tenant_id', $tenantId)->where('account_number', '5001')->first(); // Biaya Kematian Warga
        $biayaKegiatanCoa = Coa::withoutGlobalScopes()->where('tenant_id', $tenantId)->where('account_number', '5002')->first(); // Biaya Kegiatan Warga
        $biayaAdministrasi = Coa::withoutGlobalScopes()->where('tenant_id', $tenantId)->where('account_number', '5004')->first(); // Biaya Administrasi

        // Validasi COA
        if (!$cashCoa) {
            $this->command->error('COA Kas (1001) tidak ditemukan. Seeder dihentikan.');
            return;
        }

        // Masukkan semua COA yang valid (tidak null) ke array
        $incomeCoas = array_filter([$iuranWargaCoa, $bantuanPemerintahCoa, $penjualanBarangBekasCoa]);
        $expenseCoas = array_filter([$biayaKematianCoa, $biayaKegiatanCoa, $biayaAdministrasi]);

        if (empty($incomeCoas) || empty($expenseCoas)) {
            $this->command->error('COA Pemasukan (seri 400x) atau Pengeluaran (seri 500x) ada yang kosong. Pastikan CoaSeeder sudah jalan.');
            return;
        }


        // 2. Ambil tahun dan bulan saat ini
        $now = Carbon::now();
        $currentYear = $now->year;
        $currentMonthNumber = $now->month; // Misal: 10 (untuk Oktober)

        $totalEntries = 0;

        // 3. Loop dari bulan Januari (1) sampai bulan saat ini
        for ($month = 1; $month <= $currentMonthNumber; $month++) {

            // Tentukan berapa banyak entri untuk bulan ini (RANDOM 5 s/d 10 entri)
            $jumlahEntriBulanIni = rand(5, 10);

            // 4. Loop sebanyak entri random tadi
            for ($i = 0; $i < $jumlahEntriBulanIni; $i++) {

                // Tentukan tanggal transaksi random (pakai tgl 1-28 biar aman)
                $randomDay = rand(1, 28);
                $transactionDate = Carbon::create($currentYear, $month, $randomDay, rand(8, 17), rand(0, 59));

                // Tentukan jumlah random (angka bulat, misal 50.000 s/d 750.000)
                $randomAmount = rand(5, 75) * 10000;

                // Tentukan ini Pemasukan (1) atau Pengeluaran (0)
                $isPemasukan = rand(0, 1);

                $data = [
                    'tenant_id' => $tenantId,
                    'transaction_date' => $transactionDate,
                    'amount' => $randomAmount,
                ];

                if ($isPemasukan) {
                    // Ambil COA Pemasukan secara random
                    $randomIncomeCoa = $incomeCoas[array_rand($incomeCoas)];

                    $data += [
                        'normal_balance' => NormalBalance::CREDIT,
                        'debit_account_id' => $cashCoa->id,
                        'credit_account_id' => $randomIncomeCoa->id,
                        'description' => $randomIncomeCoa->account_name . " bulan " . $transactionDate->format("M"),
                        'created_at' => $transactionDate->format('Y-m-d H:i:s'),
                        'created_by_id' => 3,
                    ];
                } else {
                    // Ambil COA Pengeluaran secara random
                    $randomExpenseCoa = $expenseCoas[array_rand($expenseCoas)];

                    $data += [
                        'normal_balance' => NormalBalance::DEBIT,
                        'debit_account_id' => $randomExpenseCoa->id,
                        'credit_account_id' => $cashCoa->id,
                        'description' => $randomExpenseCoa->account_name . " bulan " . $transactionDate->format("M"),
                        'created_at' => $transactionDate->format('Y-m-d H:i:s'),
                        'created_by_id' => 3,
                    ];
                }

                // 5. Create journal
                $this->journalService->createJournal($data);
                $totalEntries++;
            }
        }

        $this->command->info("Journal Seeder selesai. Total $totalEntries entri (random) dibuat untuk $currentMonthNumber bulan.");
    }
}
