import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateRole } from '@/types/role';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import RoleForm from './form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
    {
        title: 'Create',
        href: '',
    },
];

type Props = {
    permissions: [];
};

export default function RoleCreate({ permissions }: Props) {
    console.log('permissions', permissions);
    const form = useForm<TCreateRole>({
        name: '',
        permissions: [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.post(route('roles.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Tambah Role" backUrl="/roles" />
            <RoleForm permissions={permissions} onSubmit={submit} useForm={form} />
        </AppLayout>
    );
}
