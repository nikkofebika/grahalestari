import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateCoa } from '@/types/coa';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import CoaForm from '../form/form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Coa',
        href: '/coas',
    },
    {
        title: 'Tambah',
        href: '',
    },
];

export default function CoaCreate() {
    const form = useForm<TCreateCoa>({
        tenant_id: null,
        parent_id: null,
        account_name: '',
        account_number: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log('form', form.data)

        form.post(route('coas.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Tambah COA" backUrl="/coas" />
            <CoaForm onSubmit={submit} useForm={form} />
        </AppLayout>
    );
}
