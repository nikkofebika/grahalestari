import { TCoa } from './coa';
import { TCreatedUpdatedDeletedInfo, TItemPermissions, TMedia } from './global';
import { TTenant } from './tenant';

export type TProfitActivityCategory = {
    id: number;
    tenant_id: number;
    tenant?: TTenant;
    debit_coa_id: number;
    debit_coa?: TCoa;
    credit_coa_id: number;
    credit_coa?: TCoa;
    name: string;
    description: string;
    profit_activities?: TProfitActivity[];

    created_at: string;
    updated_at: string;
} & TCreatedUpdatedDeletedInfo &
    TItemPermissions;

export type TProfitActivityCategoryFilters = {
    search: string;
};

export type TCreateProfitActivityCategory = {
    tenant_id?: number | null;
    debit_coa_id: number | null;
    credit_coa_id: number | null;
    name: string;
    description: string | null;
};

export type TProfitActivity = {
    id: number;
    profit_activity_category_id: number;
    category?: TProfitActivityCategory;
    name: string;
    date: string;
    amount: number;

    amount_formatted: string;
    media?: TMedia[];

    created_at: string;
    updated_at: string;
} & TCreatedUpdatedDeletedInfo &
    TItemPermissions;

export type TProfitActivityFilters = {
    search: string;
};

export type TCreateProfitActivity = {
    profit_activity_category_id?: number | null;
    name: string;
    date: string;
    amount: number;
    files: File[];
    removed_file_ids: number[];
};