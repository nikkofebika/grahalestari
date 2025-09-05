import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateProfitActivityCategory } from '@/types/profit-activity';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import ProfitActivityCategoryForm from '../form/form';
import { TCoa } from '@/types/coa';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kategori Kegiatan Profit',
        href: '/kategori-kegiatan-profit',
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

export default function ProfitActivityCategoryCreate({ debit_accounts, credit_accounts }: Props) {
    const form = useForm<TCreateProfitActivityCategory>({
        tenant_id: null,
        debit_coa_id: null,
        credit_coa_id: null,
        name: '',
        description: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        form.post(route('kategori-kegiatan-profit.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Tambah Kategori Kegiatan Profit" backUrl="/kategori-kegiatan-profit" />
            <ProfitActivityCategoryForm onSubmit={submit} useForm={form} debit_accounts={debit_accounts} credit_accounts={credit_accounts} />
        </AppLayout>
    );
}
