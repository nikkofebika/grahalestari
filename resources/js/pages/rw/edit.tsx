import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateGroup, TGroup } from '@/types/group';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import GroupForm from './form';

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
    group: TGroup;
};
export default function RwEdit({ group }: Props) {
    const form = useForm<TCreateGroup>({
        parent_id: group.parent_id ?? null,
        leader_id: group.leader_id ?? null,
        province_id: 36,
        province_name: 'Banten',
        city_id: 3603,
        city_name: 'Kab. Tangerang',
        district_id: 360319,
        district_name: 'Panongan',
        village_id: 3603191002,
        village_name: 'Mekar Asri',
        name: group.name,
        address: group.address,
        latitude: group.latitude,
        longitude: group.longitude,
        postal_code: group.postal_code,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.put(route('rw.update', group), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Edit RW" backUrl="/rw" />
            <GroupForm onSubmit={submit} useForm={form} submitTitle="Update" />
        </AppLayout>
    );
}
