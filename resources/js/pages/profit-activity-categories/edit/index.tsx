import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateProfitActivityCategory, TProfitActivityCategory } from '@/types/profit-activity';
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
        title: 'Update',
        href: '',
    },
];

type Props = {
    data: TProfitActivityCategory;
    debit_accounts: TCoa[];
    credit_accounts: TCoa[];
};
export default function ProfitActivityCategoryEdit({ data, debit_accounts, credit_accounts }: Props) {
    const form = useForm<TCreateProfitActivityCategory>({
        tenant_id: data.tenant_id,
        debit_coa_id: data.debit_coa_id,
        credit_coa_id: data.credit_coa_id,
        name: data.name,
        description: data.description,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.put(route('kategori-kegiatan-profit.update', data), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Edit Kategori Kegiatan Profit" backUrl="/kategori-kegiatan-profit" />
            <ProfitActivityCategoryForm onSubmit={submit} useForm={form} submitTitle="Update" debit_accounts={debit_accounts} credit_accounts={credit_accounts} />
        </AppLayout>
    );
}
