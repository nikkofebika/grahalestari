import { TCoa } from './coa';
import { TCreatedUpdatedDeletedInfo, TItemPermissions, TMedia } from './global';
import { TTenant } from './tenant';
import { TUser } from './user';

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
    effective_date: string;
    due_date: string | null;
    total_amount: number;

    total_amount_formatted: string;
    media?: TMedia[];

    created_at: string;
    updated_at: string;
} & TCreatedUpdatedDeletedInfo &
    TItemPermissions;

export type TCitizenFeeFilters = {
    search: string;
};

export type TCreateCitizenFee = {
    citizen_fee_category_id?: number | null;
    name: string;
    effective_date: string;
    due_date: string | null;
    // files: File[];
    // removed_file_ids: number[];
};

export type TCitizenFeePaymentStatus = 'not_paid' | 'in_progress' | 'paid' | 'rejected';
export const citizenFeePaymentStatuses: TCitizenFeePaymentStatus[] = ['not_paid', 'in_progress', 'paid', 'rejected'];
export const citizenFeePaymentStatusLabels: Record<TCitizenFeePaymentStatus, string> = {
    not_paid: 'Belum Bayar',
    in_progress: 'Dalam Proses',
    paid: 'Lunas',
    rejected: 'Ditolak',
}

// export type TUpdateStatusCitizenFee = {
//     status: TCitizenFeePaymentStatus | null;
// };

export type TCitizenFeeDetail = {
    id: number;
    citizen_fee_id: number;
    citizen_fee?: TCitizenFee;
    payment_at: string;
    amount: number;
    payment_status: TCitizenFeePaymentStatus;
    payment_approved_by_id: number | null;
    payment_approved_by?: TUser;
    payment_approved_at: string | null;

    amount_formatted: string;
    media?: TMedia[];

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
    payment_at: string;
    amount: number;
    // files: File[];
    // removed_file_ids: number[];
};