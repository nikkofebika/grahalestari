import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import CitizenFeeCategoryForm from '../form/form';
import { TCitizenFeeCategory, TCreateCitizenFeeCategory } from '@/types/citizen-fee';
import { TCoa } from '@/types/coa';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kategori Iuran Warga',
        href: '/kategori-iuran-warga',
    },
    {
        title: 'Update',
        href: '',
    },
];

type Props = {
    data: TCitizenFeeCategory;
    debit_accounts: TCoa[];
    credit_accounts: TCoa[];
};
export default function CitizenFeeCategoryEdit({ data, debit_accounts, credit_accounts }: Props) {
    const form = useForm<TCreateCitizenFeeCategory>({
        tenant_id: data.tenant_id,
        debit_coa_id: data.debit_coa_id,
        credit_coa_id: data.credit_coa_id,
        name: data.name,
        fix_amount: data.fix_amount ?? 0,
        description: data.description,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.put(route('kategori-iuran-warga.update', data), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Edit Kategori Iuran Warga" backUrl="/kategori-iuran-warga" />
            <CitizenFeeCategoryForm onSubmit={submit} useForm={form} submitTitle="Update" debit_accounts={debit_accounts} credit_accounts={credit_accounts} />
        </AppLayout>
    );
}
