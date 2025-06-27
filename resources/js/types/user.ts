import { TCreatedUpdatedDeletedInfo } from './global';
import { TGroup } from './group';

export type TUser = {
    id: number;
    group_id: number | null;
    group?: TGroup;
    name: string;
    email: string;
    email_verified_at: string;
    type: UserType;
    created_at: string;
    updated_at: string;

    detail?: TUserDetail;
} & TCreatedUpdatedDeletedInfo;

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

export type UserType = 'god' | 'admin' | 'user';
export const userTypes: UserType[] = ['god', 'admin', 'user'];
export const userTypeLabels: Record<UserType, string> = {
    god: 'God',
    admin: 'Administrator',
    user: 'Pengguna Biasa',
};

export type TGender = 'Laki-laki' | 'Perempuan';
export const genderTypes: TGender[] = ['Laki-laki', 'Perempuan'];

export type TReligion = 'Islam' | 'Kristen' | 'Katolik' | 'Hindu' | 'Budha' | 'Khonghucu' | 'Other';
export const religionTypes: TReligion[] = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha', 'Khonghucu', 'Other'];

export type TMaritalStatus = 'Belum Menikah' | 'Menikah' | 'Cerai Hidup' | 'Cerai Mati';
export const maritalStatusTypes: TMaritalStatus[] = ['Belum Menikah', 'Menikah', 'Cerai Hidup', 'Cerai Mati'];

export type TEducation = 'SD' | 'SMP' | 'SMA' | 'D3' | 'D4' | 'S1' | 'S2' | 'S3';
export const educationTypes: TEducation[] = ['SD', 'SMP', 'SMA', 'D3', 'D4', 'S1', 'S2', 'S3'];

export type TUserFilters = {
    search: string;
};

export type TCreateUser = {
    group_id: number | null;
    name: string;
    email: string;
    password?: string;
    type: UserType;

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
