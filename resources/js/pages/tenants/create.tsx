import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateTenant } from '@/types/tenant';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import TenantForm from './form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tenants',
        href: '/tenants',
    },
    {
        title: 'Tambah',
        href: '',
    },
];

export default function TenantCreate() {
    const form = useForm<TCreateTenant>({
        parent_id: undefined,
        province_id: 36,
        city_id: 3603,
        district_id: 360319,
        village_id: 3603191002,
        name: '',
        address: '',
        latitude: '',
        longitude: '',
        postal_code: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.post(route('tenants.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Tambah Tenant" backUrl="/tenants" />
            <TenantForm onSubmit={submit} useForm={form} />
        </AppLayout>
    );
}
