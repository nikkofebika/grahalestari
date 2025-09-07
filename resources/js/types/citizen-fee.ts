import { TCoa } from './coa';
import { TCreatedUpdatedDeletedInfo, TItemPermissions, TMedia } from './global';
import { TTenant } from './tenant';

export type TCitizenFeeCategory = {
    id: number;
    tenant_id: number;
    tenant?: TTenant;
    debit_coa_id: number;
    debit_coa?: TCoa;
    credit_coa_id: number;
    credit_coa?: TCoa;
    name: string;
    fix_amount: number | null;
    fix_amount_formatted: string | null;
    description: string;

    citizen_fees?: TCitizenFee[];

    created_at: string;
    updated_at: string;
} & TCreatedUpdatedDeletedInfo &
    TItemPermissions;

export type TCitizenFeeCategoryFilters = {
    search: string;
};

export type TCreateCitizenFeeCategory = {
    tenant_id?: number | null;
    debit_coa_id: number | null;
    credit_coa_id: number | null;
    name: string;
    fix_amount: number;
    description: string | null;
};

export type TCitizenFee = {
    id: number;
    citizen_fee_category_id: number;
    category?: TCitizenFeeCategory;
    name: string;
    date: string;
    status: TCitizenFeeStatus;
    total_amount: number;

    total_amount_formatted: string;
    media?: TMedia[];

    created_at: string;
    updated_at: string;
} & TCreatedUpdatedDeletedInfo &
    TItemPermissions;

export type TCitizenFeeStatus = 'in_progress' | 'completed';
export const citizenFeeStatuses: TCitizenFeeStatus[] = ['in_progress', 'completed'];
export const citizenFeeStatusLabels: Record<TCitizenFeeStatus, string> = {
    in_progress: 'Dalam Proses',
    completed: 'Selesai',
}

export type TCitizenFeeFilters = {
    search: string;
};

export type TCreateCitizenFee = {
    citizen_fee_category_id?: number | null;
    name: string;
    date: string;
    files: File[];
    removed_file_ids: number[];
};

export type TUpdateStatusCitizenFee = {
    // id: number | null;
    status: TCitizenFeeStatus | null;
};

export type TCitizenFeeDetail = {
    id: number;
    citizen_fee_id: number;
    citizen_fee?: TCitizenFee;
    date: string;
    amount: number;

    amount_formatted: string;
    // media?: TMedia[];

    created_at: string;
    updated_at: string;
} & TCreatedUpdatedDeletedInfo &
    TItemPermissions;

export type TCitizenFeeDetailFilters = {
    search: string;
};

export type TCreateCitizenFeeDetail = {
    citizen_fee_id?: number | null;
    user_id: number | null;
    date: string;
    amount: number;
    // files: File[];
    // removed_file_ids: number[];
};