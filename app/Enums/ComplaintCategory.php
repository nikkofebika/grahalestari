<?php

namespace App\Enums;

enum ComplaintCategory: string
{
    use BaseEnum;

    case KEBERSIHAN = 'kebersihan';
    case KEAMANAN = 'keamanan';
    case LINGKUNGAN = 'lingkungan';
    case PELAYANAN = 'pelayanan';
    case FASILITAS = 'fasilitas';
    case LALU_LINTAS = 'lalu_lintas';
    case KESEHATAN = 'kesehatan';
    case KETERTIBAN = 'ketertiban';
    case KEUANGAN = 'keuangan';
    case KEGIATAN = 'kegiatan';
    case ADMINISTRATIF = 'administratif';
}
