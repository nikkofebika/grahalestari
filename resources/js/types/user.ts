import { TCreatedUpdatedDeletedInfo, TItemPermissions, TMedia } from './global';
import { TTenant } from './tenant';

export type TUser = {
    id: number;
    group_id: number | null;
    group?: TTenant;
    tenant_id: number | null;
    tenant?: TTenant;
    name: string;
    email: string;
    email_verified_at: string;
    // avatar?: string;
    type: TUserType;
    created_at: string;
    updated_at: string;

    detail?: TUserDetail;
    image?: TMedia;
} & TCreatedUpdatedDeletedInfo &
    TItemPermissions;

export type TUserDetail = {
    user_id: number;
    no_kk: string | null;
    no_ktp: string | null;
    phone: string | null;
    birth_date: string | null;
    birth_place: string | null;
    gender: TGender | null;
    religion: TReligion | null;
    marital_status: TMaritalStatus | null;
    education: TEducation | null;
    job: string | null;
    address: string | null;
};

export type TUserType = 'god' | 'admin_rw' | 'admin_rt' | 'user';
export const userTypes: TUserType[] = ['god', 'admin_rw', 'admin_rt', 'user'];
export const userTypeLabels: Record<TUserType, string> = {
    god: 'God',
    admin_rw: 'Admin RW',
    admin_rt: 'Admin RT',
    user: 'Pengguna Biasa',
};

export type TGender = 'male' | 'female';
export const genderTypes: TGender[] = ['male', 'female'];
export const genderTypeLabels: Record<TGender, string> = {
    male: 'Laki-laki',
    female: 'Perempuan',
};

export type TReligion = 'islam' | 'kristen' | 'katolik' | 'hindu' | 'budha' | 'khonghucu';
export const religionTypes: TReligion[] = ['islam', 'kristen', 'katolik', 'hindu', 'budha', 'khonghucu'];
export const religionTypeLabels: Record<TReligion, string> = {
    islam: 'Islam',
    kristen: 'Kristen',
    katolik: 'Katolik',
    hindu: 'Hindu',
    budha: 'Budha',
    khonghucu: 'Khonghucu',
};

export type TMaritalStatus = 'single' | 'married' | 'divorced' | 'widowed';
export const maritalStatusTypes: TMaritalStatus[] = ['single', 'married', 'divorced', 'widowed'];
export const maritalStatusTypeLabels: Record<TMaritalStatus, string> = {
    single: 'Belum Menikah',
    married: 'Menikah',
    divorced: 'Cerai Hidup',
    widowed: 'Cerai Mati',
};

export type TEducation = 'SD' | 'SMP' | 'SMA' | 'D3' | 'D4' | 'S1' | 'S2' | 'S3';
export const educationTypes: TEducation[] = ['SD', 'SMP', 'SMA', 'D3', 'D4', 'S1', 'S2', 'S3'];

export type TUserFilters = {
    search: string;
};

export type TCreateUser = {
    parent_id: number | null;
    group_id: number | null;
    tenant_id: number | null;
    name: string;
    email: string;
    password?: string;
    type: TUserType;
    image: Blob | null;

    // detail
    no_kk: string | null;
    no_ktp: string | null;
    phone: string | null;
    birth_date: string | null;
    birth_place: string | null;
    gender: TGender | null;
    religion: TReligion | null;
    marital_status: TMaritalStatus | null;
    education: TEducation | null;
    job: string | null;
    address: string | null;
};
