import { TCreatedUpdatedDeletedInfo } from './global';
import { TUser } from './user';

export type TGroup = {
    id: number;
    parent_id: number | null;
    parent?: TGroup;
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
    address: string;
    latitude: string | null;
    longitude: string | null;
    postal_code: string;
    created_at: string;
    updated_at: string;
} & TCreatedUpdatedDeletedInfo;

export type TGroupFilters = {
    search: string;
};

export type TCreateGroup = {
    parent_id: number | null;
    leader_id: number | null;
    province_id: number | null;
    province_name: string | null;
    city_id: number | null;
    city_name: string | null;
    district_id: number | null;
    district_name: string | null;
    village_id: number | null;
    village_name: string | null;
    name: string;
    address: string;
    latitude: string | null;
    longitude: string | null;
    postal_code: string;
};
