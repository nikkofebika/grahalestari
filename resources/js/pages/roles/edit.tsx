import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateUser, TUser } from '@/types/user';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import UserForm from './form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
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
        name: user.name,
        email: user.email,
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.put(route('roles.update', user), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Edit Role" backUrl="/roles" />
            <UserForm onSubmit={submit} useForm={form} submitTitle="Update" />
        </AppLayout>
    );
}
