import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateTenant, TTenant } from '@/types/tenant';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import TenantForm from '../form/form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'RW',
        href: '/rw',
    },
    {
        title: 'Update',
        href: '',
    },
];

type Props = {
    data: TTenant;
};
export default function RwEdit({ data }: Props) {
    const form = useForm<TCreateTenant>({
        parent_id: data.parent_id ?? null,
        leader_id: data.leader_id ?? null,
        province_id: 36,
        province_name: 'Banten',
        city_id: 3603,
        city_name: 'Kab. Tangerang',
        district_id: 360319,
        district_name: 'Panongan',
        village_id: 3603191002,
        village_name: 'Mekar Asri',
        name: data.name,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        postal_code: data.postal_code,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.put(route('rw.update', data), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Edit RW" backUrl="/rw" />
            <TenantForm onSubmit={submit} useForm={form} submitTitle="Update" />
        </AppLayout>
    );
}
