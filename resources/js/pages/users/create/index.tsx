import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateUser } from '@/types/user';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import UserForm from '../form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
    {
        title: 'Create',
        href: '',
    },
];

export default function UserCreate() {
    const form = useForm<TCreateUser>({
        tenant_id: null,
        name: '',
        email: '',
        password: '',
        type: 'user',

        // detail
        no_kk: null,
        no_ktp: null,
        phone: null,
        birth_date: null,
        birth_place: null,
        gender: null,
        religion: null,
        marital_status: null,
        education: null,
        job: null,
        address: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.post(route('users.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Tambah User" backUrl="/users" />
            <UserForm onSubmit={submit} useForm={form} />
        </AppLayout>
    );
}
