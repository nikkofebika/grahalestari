import { TCreatedUpdatedDeletedInfo } from './global';
import { TUser } from './user';

export type TComplaint = {
    id: number;
    user_id: number;
    user?: TUser;
    category: TComplaintCategory;
    status: TComplaintStatus;
    title: string;
    description: string;
    location: string;
    latitude: string | null;
    longitude: string | null;
    handled_at: string | null;
    handled_by_id: number | null;
    handled_by?: TUser;
    done_at: string | null;
    done_by_id: number | null;
    done_by?: TUser;
    feedback: string | null;

    created_at: string;
    updated_at: string;
} & TCreatedUpdatedDeletedInfo;

export type TComplaintCategory =
    | 'kebersihan'
    | 'keamanan'
    | 'lingkungan'
    | 'pelayanan'
    | 'fasilitas'
    | 'lalu_lintas'
    | 'kesehatan'
    | 'ketertiban'
    | 'keuangan'
    | 'kegiatan'
    | 'administratif';
export const complaintCategories: TComplaintCategory[] = [
    'kebersihan',
    'keamanan',
    'lingkungan',
    'pelayanan',
    'fasilitas',
    'lalu_lintas',
    'kesehatan',
    'ketertiban',
    'keuangan',
    'kegiatan',
    'administratif',
];
export const complaintCategoryLabels: Record<TComplaintCategory, string> = {
    kebersihan: 'Kebersihan',
    keamanan: 'Keamanan',
    lingkungan: 'Lingkungan',
    pelayanan: 'Pelayanan',
    fasilitas: 'Fasilitas',
    lalu_lintas: 'Lalu Lintas',
    kesehatan: 'Kesehatan',
    ketertiban: 'Ketertiban',
    keuangan: 'Keuangan',
    kegiatan: 'Kegiatan',
    administratif: 'Administratif',
};

export type TComplaintStatus = 'pending' | 'in_progress' | 'done';
export const complaintStatuses: TComplaintStatus[] = ['pending', 'in_progress', 'done'];
export const complaintStatusLabels: Record<TComplaintStatus, string> = {
    pending: 'Pending',
    in_progress: 'Di Proses',
    done: 'Selesai',
};

export type TComplaintFilters = {
    search: string;
};

export type TCreateComplaint = {
    category: TComplaintCategory;
    // status: TComplaintStatus | null;
    title: string;
    description: string;
    location: string;
    latitude: string | null;
    longitude: string | null;
    // handled_at: string | null;
    // handled_by_id: number | null;
    // done_at: string | null;
    // done_by_id: number | null;
    // feedback: string | null;
};
