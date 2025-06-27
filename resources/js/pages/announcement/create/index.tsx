import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateAnnouncement } from '@/types/announcement';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { FormEventHandler } from 'react';
import AnnouncementForm from '../form/form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengumuman',
        href: '/pengumuman',
    },
    {
        title: 'Tambah',
        href: '',
    },
];

export default function AnnouncementCreate() {
    const form = useForm<TCreateAnnouncement>({
        category: 'acara',
        target_scope: 'public',
        title: '',
        start_at: format(new Date(), 'yyyy-MM-dd HH:mm'),
        end_at: format(new Date(), 'yyyy-MM-dd HH:mm'),
        description: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.post(route('pengumuman.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Tambah Pengumuman" backUrl="/pengumuman" />
            <AnnouncementForm onSubmit={submit} useForm={form} />
        </AppLayout>
    );
}
