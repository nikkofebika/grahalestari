import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCoa, TNormalBalance } from '@/types/coa';
import { TCreateJournal } from '@/types/journal';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import JournalForm from '../form/form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jurnal',
        href: '/journals',
    },
    {
        title: 'Tambah',
        href: '',
    },
];

type Props = {
    normalBalance: TNormalBalance;
    debit_accounts: TCoa[];
    credit_accounts: TCoa[];
};
export default function JournalCreate({ normalBalance, debit_accounts, credit_accounts }: Props) {
    const form = useForm<TCreateJournal>({
        tenant_id: null,
        transaction_date: '',
        amount: 0,
        description: '',
        debit_account_id: null,
        credit_account_id: null,
        files: [],
        removed_file_ids: [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.post(route('journals.store', normalBalance), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    const type = normalBalance === 'credit' ? 'Pemasukan' : 'Pengeluaran';
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title={`Tambah ${type}`} backUrl="/journals" />
            <JournalForm
                onSubmit={submit}
                useForm={form}
                normalBalance={normalBalance}
                debit_accounts={debit_accounts}
                credit_accounts={credit_accounts}
            />
        </AppLayout>
    );
}
