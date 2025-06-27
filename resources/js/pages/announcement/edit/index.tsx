import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TAnnouncement, TCreateAnnouncement } from '@/types/announcement';
import { useForm } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { FormEventHandler } from 'react';
import AnnouncementForm from '../form/form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengumuman',
        href: '/pengumuman',
    },
    {
        title: 'Update',
        href: '',
    },
];

type Props = {
    data: TAnnouncement;
};
export default function AnnouncementEdit({ data }: Props) {
    const form = useForm<TCreateAnnouncement>({
        category: data.category,
        target_scope: data.target_scope,
        title: data.title,
        start_at: format(parseISO(data.start_at), 'yyyy-MM-dd HH:mm'),
        end_at: format(parseISO(data.end_at), 'yyyy-MM-dd HH:mm'),
        description: data.description,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.put(route('pengumuman.update', data), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Edit Pengumuman" backUrl="/pengumuman" />
            <AnnouncementForm onSubmit={submit} useForm={form} submitTitle="Update" />
        </AppLayout>
    );
}
