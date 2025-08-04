import { TCoa, TNormalBalance } from './coa';
import { TCreatedUpdatedDeletedInfo, TItemPermissions, TMedia } from './global';
import { TTenant } from './tenant';

export type TJournal = {
    id: number;
    tenant_id: number;
    tenant?: TTenant;
    transaction_date: string;
    normal_balance: TNormalBalance;
    amount: number;
    amount_formatted: string;
    description: string;
    details: TJournalDetail[];
    detail?: TJournalDetail;
    media?: TMedia[];

    created_at: string;
    updated_at: string;
} & TCreatedUpdatedDeletedInfo &
    TItemPermissions;

export type TJournalDetail = {
    id: number;
    journal_id: number;
    journal?: TJournal;
    coa_id: number;
    coa?: TCoa;
    debit: number;
    debit_formatted: string;
    credit: number;
    credit_formatted: string;

    created_at: string;
    updated_at: string;
};

export type TJournalFilters = {
    search: string;
};

export type TCreateJournal = {
    tenant_id?: number | null;
    transaction_date: string;
    amount: number;
    description: string;
    debit_account_id: number | null;
    credit_account_id: number | null;
    files: File[];
    removed_file_ids: number[];
};
