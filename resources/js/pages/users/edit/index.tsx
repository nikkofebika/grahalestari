import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateUser, TUser } from '@/types/user';
import { router, useForm } from '@inertiajs/react';
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
    data: TUser;
};
export default function UserCreate({ data }: Props) {
    console.log('data user', data);
    const form = useForm<TCreateUser>({
        parent_id: data.parent_id,
        group_id: data.group_id,
        tenant_id: data.tenant_id,
        name: data.name,
        email: data.email,
        password: undefined,
        type: data.type,
        image: null,

        // detail
        no_kk: data.detail?.no_kk ?? null,
        no_ktp: data.detail?.no_ktp ?? null,
        phone: data.detail?.phone ?? null,
        birth_date: data.detail?.birth_date ?? null,
        birth_place: data.detail?.birth_place ?? null,
        gender: data.detail?.gender ?? null,
        religion: data.detail?.religion ?? null,
        marital_status: data.detail?.marital_status ?? null,
        education: data.detail?.education ?? null,
        job: data.detail?.job ?? null,
        address: data.detail?.address ?? null,

    });

    const submit: FormEventHandler = (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');

        // loop semua data
        Object.entries(form.data).forEach(([key, value]) => {
            // skip null/undefined
            if (value === null || value === undefined) return;

            // handle Blob/File (misalnya "image")
            if (value instanceof Blob) {
                formData.append(key, value, 'image.jpg');
            } else {
                formData.append(key, String(value)); // pastikan string
            }
        });

        router.post(route('users.update', data), formData, {
            forceFormData: true,
            onError: (errors) => {
                console.log('errors', errors);
                form.setError(errors); // agar errornya tetap masuk ke form.errors
            },
            onFinish: () => form.reset('image'), // reset image kalau perlu
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Edit User" backUrl="/users" />
            <UserForm user={data} onSubmit={submit} useForm={form} submitTitle="Update" />
        </AppLayout>
    );
}
