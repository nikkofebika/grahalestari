<?php

namespace App\Enums;

enum AnnouncementCategory: string
{
    use BaseEnum;

    case UMUM = 'umum';
    case DARURAT = 'darurat';
    case ACARA = 'acara';
    case HIMBAUAN = 'himbauan';
    case PEMELIHARAAN = 'pemeliharaan';
    case KEAMANAN = 'keamanan';
    case LAYANAN = 'layanan';
    case IURAN = 'iuran';
    case PERATURAN = 'peraturan';
    case KEHILANGAN = 'kehilangan';
    case PERINGATAN = 'peringatan';
}
