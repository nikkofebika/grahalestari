import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateUser, TUser } from '@/types/user';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import UserForm from '../form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
    {
        title: 'Update',
        href: '',
    },
];

type Props = {
    user: TUser;
};
export default function UserCreate({ user }: Props) {
    const form = useForm<TCreateUser>({
        tenant_id: user.tenant_id,
        name: user.name,
        email: user.email,
        password: undefined,
        type: user.type,

        // detail
        no_kk: user.detail?.no_kk ?? null,
        no_ktp: user.detail?.no_ktp ?? null,
        phone: user.detail?.phone ?? null,
        birth_date: user.detail?.birth_date ?? null,
        birth_place: user.detail?.birth_place ?? null,
        gender: user.detail?.gender ?? null,
        religion: user.detail?.religion ?? null,
        marital_status: user.detail?.marital_status ?? null,
        education: user.detail?.education ?? null,
        job: user.detail?.job ?? null,
        address: user.detail?.address ?? null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.put(route('users.update', user), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Edit User" backUrl="/users" />
            <UserForm user={user} onSubmit={submit} useForm={form} submitTitle="Update" />
        </AppLayout>
    );
}
