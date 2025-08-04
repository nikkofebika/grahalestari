import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateUser } from '@/types/user';
import { router, useForm } from '@inertiajs/react';
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
        parent_id: null,
        group_id: null,
        tenant_id: null,
        name: '',
        email: '',
        password: '',
        type: 'user',
        image: null,

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

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

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

        router.post(route('users.store'), formData, {
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
            <CreateUpdatePageHeading title="Tambah User" backUrl="/users" />
            <UserForm onSubmit={submit} useForm={form} />
        </AppLayout>
    );
}
