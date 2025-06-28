import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateTenant } from '@/types/tenant';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import TenantForm from '../form/form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'RT',
        href: '/rt',
    },
    {
        title: 'Tambah',
        href: '',
    },
];

export default function RtCreate() {
    const form = useForm<TCreateTenant>({
        parent_id: null,
        leader_id: null,
        province_id: 36,
        province_name: 'Banten',
        city_id: 3603,
        city_name: 'Kab. Tangerang',
        district_id: 360319,
        district_name: 'Panongan',
        village_id: 3603191002,
        village_name: 'Mekar Bakti',
        name: '',
        address: '',
        latitude: null,
        longitude: null,
        postal_code: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.post(route('rt.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Tambah RT" backUrl="/rt" />
            <TenantForm onSubmit={submit} useForm={form} />
        </AppLayout>
    );
}
