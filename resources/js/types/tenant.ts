import { TCreatedUpdatedDeletedInfo, TItemPermissions } from './global';
import { TUser } from './user';

export type TTenant = {
    id: number;
    parent_id: number | null;
    parent?: TTenant;
    leader_id: number | null;
    leader?: TUser;
    province_id: number | null;
    province_name: string | null;
    city_id: number | null;
    city_name: string | null;
    district_id: number | null;
    district_name: string | null;
    village_id: number | null;
    village_name: string | null;
    name: string;
    full_name: string;
    number: number;
    address: string;
    latitude: string | null;
    longitude: string | null;
    postal_code: string;
    created_at: string;
    updated_at: string;

    total_users?: number;
    total_kk?: number;
} & TCreatedUpdatedDeletedInfo &
    TItemPermissions;

export type TTenantFilters = {
    search: string;
};

export type TCreateTenant = {
    parent_id: number | null;
    leader_id: number | null;
    province_id: number | null;
    province_name?: string | null;
    city_id: number | null;
    city_name?: string | null;
    district_id: number | null;
    district_name?: string | null;
    village_id: number | null;
    village_name?: string | null;
    name: string;
    number: number | null;
    address: string;
    latitude: string | null;
    longitude: string | null;
    postal_code: string;
};
