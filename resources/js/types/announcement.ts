import { TCreatedUpdatedDeletedInfo } from './global';
import { TUser } from './user';

export type TAnnouncement = {
    id: number;
    user_id: number;
    user?: TUser;
    category: TAnnouncementCategory;
    target_scope: TAnnouncementTargetScope;
    title: string;
    start_at: string;
    end_at: string;
    description: string;

    created_at: string;
    updated_at: string;
} & TCreatedUpdatedDeletedInfo;

export type TAnnouncementCategory =
    | 'umum'
    | 'darurat'
    | 'acara'
    | 'himbauan'
    | 'pemeliharaan'
    | 'keamanan'
    | 'layanan'
    | 'iuran'
    | 'peraturan'
    | 'kehilangan'
    | 'peringatan';
export const announcementCategories: TAnnouncementCategory[] = [
    'umum',
    'darurat',
    'acara',
    'himbauan',
    'pemeliharaan',
    'keamanan',
    'layanan',
    'iuran',
    'peraturan',
    'kehilangan',
    'peringatan',
];
export const announcementCategoryLabels: Record<TAnnouncementCategory, string> = {
    umum: 'Umum',
    darurat: 'Darurat',
    acara: 'Acara',
    himbauan: 'Himbauan',
    pemeliharaan: 'Pemeliharaan',
    keamanan: 'Keamanan',
    layanan: 'Layanan',
    iuran: 'Iuran',
    peraturan: 'Peraturan',
    kehilangan: 'Kehilangan',
    peringatan: 'Peringatan',
};

export type TAnnouncementTargetScope = 'public' | 'admin_rt' | 'admin_rw';
export const announcementTargetScopes: TAnnouncementTargetScope[] = ['public', 'admin_rt', 'admin_rw'];
export const announcementTargetScopeLabels: Record<TAnnouncementTargetScope, string> = {
    public: 'Umum',
    admin_rt: 'Admin RT',
    admin_rw: 'Admin RW',
};

export type TAnnouncementFilters = {
    search: string;
};

export type TCreateAnnouncement = {
    category: TAnnouncementCategory;
    target_scope: TAnnouncementTargetScope;
    title: string;
    start_at: string;
    end_at: string;
    description: string;
};
