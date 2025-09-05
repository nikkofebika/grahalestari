import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateCitizenFeeCategory } from '@/types/citizen-fee';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { TCoa } from '@/types/coa';
import CitizenFeeCategoryForm from '../form/form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kategori Iuran Warga',
        href: '/kategori-iuran-warga',
    },
    {
        title: 'Tambah',
        href: '',
    },
];

type Props = {
    debit_accounts: TCoa[];
    credit_accounts: TCoa[];
}

export default function CitizenFeeCategoryCreate({ debit_accounts, credit_accounts }: Props) {
    const form = useForm<TCreateCitizenFeeCategory>({
        tenant_id: null,
        debit_coa_id: null,
        credit_coa_id: null,
        name: '',
        fix_amount: 0,
        description: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        form.post(route('kategori-iuran-warga.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Tambah Kategori Iuran Warga" backUrl="/kategori-iuran-warga" />
            <CitizenFeeCategoryForm onSubmit={submit} useForm={form} debit_accounts={debit_accounts} credit_accounts={credit_accounts} />
        </AppLayout>
    );
}
