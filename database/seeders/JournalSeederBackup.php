<?php

namespace Database\Seeders;

use App\Models\Coa;
use App\Models\Journal;
use App\Models\JournalDetail;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class JournalSeederBackup extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Tetapkan Tenant ID yang diminta
        $tenantId = 2;

        // 1. Ambil COA ID yang diperlukan (Pastikan CoaSeeder sudah jalan)
        $cashCoa = Coa::withoutGlobalScopes()->where('tenant_id', $tenantId)->where('account_number', '1001')->first();
        $incomeCoa = Coa::withoutGlobalScopes()->where('tenant_id', $tenantId)->where('account_number', '4001')->first(); // Iuran Warga
        $expenseCoa1 = Coa::withoutGlobalScopes()->where('tenant_id', $tenantId)->where('account_number', '5002')->first(); // Biaya Kegiatan
        $expenseCoa2 = Coa::withoutGlobalScopes()->where('tenant_id', $tenantId)->where('account_number', '5004')->first(); // Biaya Administrasi

        // Handling jika data COA tidak ditemukan
        if (!$cashCoa || !$incomeCoa || !$expenseCoa1 || !$expenseCoa2) {
            $this->command->error("Data COA untuk tenant_id {$tenantId} tidak lengkap (perlu 1001, 4001, 5002, 5004). Harap jalankan CoaSeeder terlebih dahulu!");
            return;
        }

        $cashCoaId = $cashCoa->id;
        $incomeCoaId = $incomeCoa->id;
        $expenseCoa1Id = $expenseCoa1->id;
        $expenseCoa2Id = $expenseCoa2->id;

        // 2. Tentukan rentang tanggal (Awal hingga Akhir Bulan Ini)
        $startDate = Carbon::now()->startOfMonth();
        $endDate = Carbon::now()->endOfMonth();
        $currentDate = $startDate->copy();

        $this->command->info("Membuat transaksi untuk tenant_id: {$tenantId} dari {$startDate->toDateString()} sampai {$endDate->toDateString()}");

        // 3. Loop melalui setiap hari dalam bulan
        while ($currentDate->lte($endDate)) {
            // Tentukan apakah hari ini ada pemasukan atau pengeluaran secara acak
            $hasIncome = (bool) random_int(0, 1); // 50% kemungkinan ada pemasukan
            $hasExpense = (bool) random_int(0, 1); // 50% kemungkinan ada pengeluaran

            if ($hasIncome) {
                $this->createIncomeEntry($tenantId, $currentDate, $cashCoaId, $incomeCoaId);
            }

            if ($hasExpense) {
                // Pilih Biaya Kegiatan atau Biaya Administrasi secara acak
                $expenseCoaId = random_int(0, 1) === 0 ? $expenseCoa1Id : $expenseCoa2Id;
                $this->createExpenseEntry($tenantId, $currentDate, $cashCoaId, $expenseCoaId);
            }

            $currentDate->addDay();
        }

        $this->command->info('Journal Seeder selesai.');
    }

    /**
     * Membuat entri jurnal untuk Pemasukan (Debit Kas, Kredit Pendapatan)
     */
    protected function createIncomeEntry(int $tenantId, Carbon $date, int $cashCoaId, int $incomeCoaId): void
    {
        // Jumlah transaksi antara Rp 50.000 s/d Rp 500.000
        $amount = random_int(50, 500) * 1000;
        $description = 'Penerimaan Iuran Warga Tanggal ' . $date->day . ' ' . $date->monthName;

        DB::transaction(function () use ($tenantId, $date, $amount, $description, $cashCoaId, $incomeCoaId) {
            $journal = Journal::create([
                'tenant_id' => $tenantId,
                'transaction_date' => $date,
                // normal_balance diisi berdasarkan sisi debit/kredit yang mewakili jenis jurnal (opsional)
                'normal_balance' => 'debit',
                'amount' => $amount,
                'description' => $description,
            ]);

            // 1. Debit Kas (1001) - Peningkatan Harta (Debit)
            JournalDetail::create([
                'journal_id' => $journal->id,
                'coa_id' => $cashCoaId,
                'debit' => $amount,
                'credit' => 0,
            ]);

            // 2. Kredit Pendapatan (4001) - Peningkatan Pendapatan (Credit)
            JournalDetail::create([
                'journal_id' => $journal->id,
                'coa_id' => $incomeCoaId,
                'debit' => 0,
                'credit' => $amount,
            ]);
        });
    }

    /**
     * Membuat entri jurnal untuk Pengeluaran (Debit Biaya, Kredit Kas)
     */
    protected function createExpenseEntry(int $tenantId, Carbon $date, int $cashCoaId, int $expenseCoaId): void
    {
        // Jumlah transaksi antara Rp 10.000 s/d Rp 250.000
        $amount = random_int(10, 250) * 1000;

        $expenseCoa = Coa::withoutGlobalScopes()->find($expenseCoaId);
        $description = 'Pembayaran ' . $expenseCoa->account_name . ' Tanggal ' . $date->day . ' ' . $date->monthName;

        DB::transaction(function () use ($tenantId, $date, $amount, $description, $cashCoaId, $expenseCoaId) {
            $journal = Journal::create([
                'tenant_id' => $tenantId,
                'transaction_date' => $date,
                // normal_balance diisi berdasarkan sisi debit/kredit yang mewakili jenis jurnal (opsional)
                'normal_balance' => 'credit',
                'amount' => $amount,
                'description' => $description,
            ]);

            // 1. Debit Biaya (5xxx) - Peningkatan Biaya (Debit)
            JournalDetail::create([
                'journal_id' => $journal->id,
                'coa_id' => $expenseCoaId,
                'debit' => $amount,
                'credit' => 0,
            ]);

            // 2. Kredit Kas (1001) - Penurunan Harta (Credit)
            JournalDetail::create([
                'journal_id' => $journal->id,
                'coa_id' => $cashCoaId,
                'debit' => 0,
                'credit' => $amount,
            ]);
        });
    }
}
