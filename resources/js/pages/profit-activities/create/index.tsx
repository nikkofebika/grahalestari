import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateProfitActivity } from '@/types/profit-activity';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import ProfitActivityForm from '../form/form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kegiatan Profit',
        href: '/kegiatan-profit',
    },
    {
        title: 'Tambah',
        href: '',
    },
];

export default function ProfitActivityCreate() {
    const form = useForm<TCreateProfitActivity>({
        profit_activity_category_id: null,
        name: '',
        date: '',
        amount: 0,
        files: [],
        removed_file_ids: [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        form.post(route('kegiatan-profit.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Tambah Kegiatan Profit" backUrl="/kegiatan-profit" />
            <ProfitActivityForm onSubmit={submit} useForm={form} />
        </AppLayout>
    );
}
