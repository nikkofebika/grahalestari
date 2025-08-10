import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCoa } from '@/types/coa';
import { TCreateJournal, TJournal } from '@/types/journal';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import JournalForm from '../form/form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Coa',
        href: '/coas',
    },
    {
        title: 'Update',
        href: '',
    },
];

type Props = {
    data: TJournal;
    debit_accounts: TCoa[];
    credit_accounts: TCoa[];
};
export default function JournalEdit({ data, debit_accounts, credit_accounts }: Props) {
    console.log('data', data);

    let type = 'Pemasukan';
    let debitAccountId = data.details[1].coa_id;
    let creditAccountId = data.details[0].coa_id;

    if (data.normal_balance === 'debit') {
        type = 'Pengeluaran';
        debitAccountId = data.details[0].coa_id;
        creditAccountId = data.details[1].coa_id;
    }

    const form = useForm<TCreateJournal>({
        transaction_date: data.transaction_date,
        amount: data.amount,
        description: data.description,
        debit_account_id: debitAccountId,
        credit_account_id: creditAccountId,
        files: [],
        removed_file_ids: [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.post(route('transactions.update', data) + '?_method=PUT', {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title={`Edit ${type}`} backUrl="/coas" />
            <JournalForm
                onSubmit={submit}
                useForm={form}
                normalBalance={data.normal_balance}
                debit_accounts={debit_accounts}
                credit_accounts={credit_accounts}
                journal={data}
            />
        </AppLayout>
    );
}
