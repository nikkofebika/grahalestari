<?php

namespace App\Exports\User;

use App\Models\Rt;
use App\Models\Rw;
use App\Models\User;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class UsersExport implements
    FromQuery,
    WithHeadings,
    WithMapping,
    WithCustomStartCell,
    WithEvents
{
    use Exportable;

    private ?Rw $rw;
    private ?Rt $rt = null;

    public function __construct(private User $user, private ?int $tenantId) {}

    public function query()
    {
        $this->rw = Rw::withoutGlobalScopes()->find($this->user->group_id);

        if ($this->tenantId) {
            $this->rt = Rt::find($this->tenantId);
        }

        return User::select('id', 'group_id', 'tenant_id', 'name', 'email', 'type', 'created_at', 'updated_at')
            ->whereNotNull('group_id')
            ->when(!$this->user->is_god, fn($q) => $q->where('group_id', $this->user->group_id))
            ->when($this->tenantId, fn($q) => $q->where('tenant_id', $this->tenantId))
            ->when(!$this->tenantId, fn($q) => $q->with('tenant', fn($q) => $q->select('id', 'name')))
            ->with('detail')
            ->orderBy('tenant_id');
    }

    public function map($user): array
    {
        return [
            ($this->rt ? $this->rt->name : ($user->tenant ? $user->tenant->name : '')),
            $user->name,
            $user->email,
            $user->detail->phone, // leading ' agar jadi teks
            $user->type->value,
            $user->detail->no_kk,
            $user->detail->no_ktp,
            $user->detail->birth_date,
            $user->detail->birth_place,
            $user->detail->gender->value,
            $user->detail->religion->getLabel(),
            $user->detail->marital_status->getLabel(),
            $user->detail->education->getLabel(),
            $user->detail->job,
            $user->detail->address,
            $user->created_at,
            $user->updated_at,
        ];
    }

    public function headings(): array
    {
        return [
            'RT',
            'Nama',
            'Email',
            'Telepon',
            'Tipe User',
            'Nomor KK',
            'Nomor KTP',
            'Tanggal Lahir',
            'Tempat Lahir',
            'Jenis Kelamin',
            'Agama',
            'Status Perkawinan',
            'Pendidikan',
            'Pekerjaan',
            'Alamat',
            'Terdaftar Di Sistem Pada',
            'Terakhir Di Update Pada',
        ];
    }

    public function startCell(): string
    {
        return 'A4';
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $sheet = $event->sheet->getDelegate();

                $rwName = $this->rw?->name ?? '-';
                $rtName = $this->rt?->name ?? 'Semua RT';
                $highestRow = $sheet->getHighestRow();

                // ✅ Judul dan Subjudul (satu kali)
                $sheet->mergeCells('A1:Q1')->setCellValue('A1', 'Laporan Data Warga');
                $sheet->mergeCells('A2:Q2')->setCellValue('A2', "RW: {$rwName} | RT: {$rtName}");
                $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(14);
                $sheet->getStyle('A1:A2')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

                // ✅ Header styling (sekali range)
                $headerRange = 'A4:Q4';
                $sheet->getStyle($headerRange)->applyFromArray([
                    'font' => ['bold' => true],
                    'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => ['argb' => '8db4e2'],
                    ],
                    'borders' => [
                        'allBorders' => ['borderStyle' => Border::BORDER_THIN],
                    ],
                ]);

                // ✅ Format kolom D,F,G sekali langsung range
                foreach (['D', 'F', 'G'] as $col) {
                    // Format text
                    // $sheet->getStyle("{$col}5:{$col}{$highestRow}")
                    //     ->getNumberFormat()->setFormatCode(NumberFormat::FORMAT_TEXT);

                    // Ambil semua value dalam range
                    $columnValues = $sheet->rangeToArray("{$col}5:{$col}{$highestRow}", null, true, true, true);

                    // Set ulang seluruh kolom secara explicit (lebih cepat dibanding loop baris)
                    foreach ($columnValues as $rowIndex => $row) {
                        $value = (string) $row[$col];
                        $sheet->setCellValueExplicit("{$col}{$rowIndex}", $value, DataType::TYPE_STRING);
                    }
                }
            },
        ];
    }


    // public function registerEvents(): array
    // {
    //     return [
    //         AfterSheet::class => function (AfterSheet $event) {
    //             $sheet = $event->sheet->getDelegate();

    //             $rwName = $this->rw?->name ?? '-';
    //             $rtName = $this->rt?->name ?? 'Semua RT';

    //             // ✅ Judul
    //             $sheet->setCellValue('A1', 'Laporan Data Warga');
    //             $sheet->mergeCells('A1:P1');
    //             $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(14);
    //             $sheet->getStyle('A1')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

    //             // ✅ Subjudul
    //             $sheet->setCellValue('A2', "RW: {$rwName} | RT: {$rtName}");
    //             $sheet->mergeCells('A2:P2');
    //             $sheet->getStyle('A2')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

    //             // ✅ Styling header (row 4)
    //             $headerRange = 'A4:Q4';
    //             $sheet->getStyle($headerRange)->getFont()->setBold(true);
    //             $sheet->getStyle($headerRange)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
    //             $sheet->getStyle($headerRange)->getFill()->setFillType(Fill::FILL_SOLID)
    //                 ->getStartColor()->setARGB('FFECECEC');
    //             $sheet->getStyle($headerRange)->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);

    //             // ✅ Format kolom agar No HP / KTP / KK tidak jadi angka ilmiah
    //             // misal kolom D (telepon), F (no KK), G (no KTP)
    //             $highestRow = $sheet->getHighestRow();

    //             for ($row = 5; $row <= $highestRow; $row++) {
    //                 foreach (['D', 'F', 'G'] as $col) {
    //                     $cell = $sheet->getCell("{$col}{$row}");
    //                     $value = (string) $cell->getValue();
    //                     $sheet->setCellValueExplicit("{$col}{$row}", $value, DataType::TYPE_STRING);
    //                 }
    //             }

    //             // foreach (['D', 'F', 'G'] as $col) {
    //             //     $sheet->getStyle("{$col}5:{$col}{$highestRow}")
    //             //         ->getNumberFormat()->setFormatCode(NumberFormat::FORMAT_TEXT);
    //             // }
    //         },
    //     ];
    // }
}
