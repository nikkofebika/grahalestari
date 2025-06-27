import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateGroup } from '@/types/group';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import GroupForm from './form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Groups',
        href: '/groups',
    },
    {
        title: 'Tambah',
        href: '',
    },
];

export default function GroupCreate() {
    const form = useForm<TCreateGroup>({
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

        form.post(route('groups.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Tambah Group" backUrl="/groups" />
            <GroupForm onSubmit={submit} useForm={form} />
        </AppLayout>
    );
}
