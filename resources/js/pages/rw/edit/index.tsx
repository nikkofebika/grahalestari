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
        province_id: data.province_id,
        city_id: data.city_id,
        district_id: data.district_id,
        village_id: data.village_id,
        name: data.name,
        number: data.number,
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
