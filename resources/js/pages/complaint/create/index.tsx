import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateComplaint } from '@/types/complaint';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import ComplaintForm from '../form/form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Aduan Masyarakat',
        href: '/aduan-masyarakat',
    },
    {
        title: 'Tambah',
        href: '',
    },
];

export default function ComplaintCreate() {
    const form = useForm<TCreateComplaint>({
        category: 'lingkungan',
        title: '',
        description: '',
        location: '',
        latitude: null,
        longitude: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.post(route('aduan-masyarakat.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Tambah Aduan Masyarakat" backUrl="/aduan-masyarakat" />
            <ComplaintForm onSubmit={submit} useForm={form} />
        </AppLayout>
    );
}
