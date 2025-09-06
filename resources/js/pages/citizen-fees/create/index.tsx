import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateCitizenFee } from '@/types/citizen-fee';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import CitizenFeeForm from '../form/form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Iuran Warga',
        href: '/iuran-warga',
    },
    {
        title: 'Tambah',
        href: '',
    },
];

export default function CitizenFeeCreate() {
    const form = useForm<TCreateCitizenFee>({
        citizen_fee_category_id: null,
        name: '',
        date: '',
        files: [],
        removed_file_ids: [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        form.post(route('iuran-warga.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Tambah Iuran Warga" backUrl="/iuran-warga" />
            <CitizenFeeForm onSubmit={submit} useForm={form} />
        </AppLayout>
    );
}
