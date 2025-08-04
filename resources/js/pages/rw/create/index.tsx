import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateTenant } from '@/types/tenant';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import TenantForm from '../form/form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'RW',
        href: '/rw',
    },
    {
        title: 'Tambah',
        href: '',
    },
];

export default function RwCreate() {
    const form = useForm<TCreateTenant>({
        parent_id: null,
        leader_id: null,
        province_id: null,
        // province_name: 'Banten',
        city_id: null,
        // city_name: 'Kab. Tangerang',
        district_id: null,
        // district_name: 'Panongan',
        village_id: null,
        // village_name: 'Mekar Asri',
        name: '',
        number: null,
        address: '',
        latitude: null,
        longitude: null,
        postal_code: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.post(route('rw.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Tambah RW" backUrl="/rw" />
            <TenantForm onSubmit={submit} useForm={form} />
        </AppLayout>
    );
}
