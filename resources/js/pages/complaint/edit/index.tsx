import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TComplaint, TCreateComplaint } from '@/types/complaint';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import ComplaintForm from '../form/form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Aduan Masyarakat',
        href: '/aduan-masyarakat',
    },
    {
        title: 'Update',
        href: '',
    },
];

type Props = {
    data: TComplaint;
};
export default function ComplaintEdit({ data }: Props) {
    const form = useForm<TCreateComplaint>({
        category: 'lingkungan',
        title: data.title,
        description: data.description,
        location: data.location,
        latitude: data.latitude,
        longitude: data.longitude,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.put(route('aduan-masyarakat.update', data), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Edit Aduan Masyarakat" backUrl="/aduan-masyarakat" />
            <ComplaintForm onSubmit={submit} useForm={form} submitTitle="Update" />
        </AppLayout>
    );
}
