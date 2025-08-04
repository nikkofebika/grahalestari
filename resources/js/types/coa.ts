import { TCreatedUpdatedDeletedInfo, TItemPermissions } from './global';
import { TTenant } from './tenant';

export type TCoa = {
    id: number;
    tenant_id: number;
    tenant?: TTenant;
    parent_id: number;
    parent?: TCoa;
    account_name: string;
    account_number: string;
    normal_balance: TNormalBalance;
    childs: TCoa[];

    created_at: string;
    updated_at: string;
} & TCreatedUpdatedDeletedInfo &
    TItemPermissions;

export type TNormalBalance = 'debit' | 'credit';
export const normalBalances: TNormalBalance[] = ['debit', 'credit'];
export const normalBalanceLabels: Record<TNormalBalance, string> = {
    debit: 'Debit',
    credit: 'Credit',
};

export type TCoaFilters = {
    search: string;
};

export type TCreateCoa = {
    tenant_id?: number | null;
    parent_id?: number | null;
    account_name: string;
    account_number: string;
};
