import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCoa, TCreateCoa } from '@/types/coa';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import CoaForm from '../form/form';

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
    data: TCoa;
};
export default function CoaEdit({ data }: Props) {
    const form = useForm<TCreateCoa>({
        account_name: data.account_name,
        account_number: data.account_number,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.put(route('coas.update', data), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Edit Pengumuman" backUrl="/coas" />
            <CoaForm onSubmit={submit} useForm={form} submitTitle="Update" coa={data} isUpdate={true} />
        </AppLayout>
    );
}
