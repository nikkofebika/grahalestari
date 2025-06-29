import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateTenant, TTenant } from '@/types/tenant';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import TenantForm from './form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tenants',
        href: '/tenants',
    },
    {
        title: 'Update',
        href: '',
    },
];

type Props = {
    data: TTenant;
};
export default function TenantCreate({ data }: Props) {
    const form = useForm<TCreateTenant>({
        name: tenant.name,
        email: tenant.email,
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.put(route('tenants.update', data), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Edit Tenant" backUrl="/tenants" />
            <TenantForm onSubmit={submit} useForm={form} submitTitle="Update" />
        </AppLayout>
    );
}
