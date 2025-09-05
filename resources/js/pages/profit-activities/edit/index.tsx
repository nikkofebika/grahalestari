import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateProfitActivity, TProfitActivity } from '@/types/profit-activity';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import ProfitActivityForm from '../form/form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kegiatan Profit',
        href: '/kegiatan-profit',
    },
    {
        title: 'Update',
        href: '',
    },
];

type Props = {
    data: TProfitActivity;
};
export default function ProfitActivityEdit({ data }: Props) {
    const form = useForm<TCreateProfitActivity>({
        profit_activity_category_id: data.profit_activity_category_id,
        name: data.name,
        date: data.date,
        amount: data.amount,
        files: [],
        removed_file_ids: [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.put(route('kegiatan-profit.update', data), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Edit Kegiatan Profit" backUrl="/kegiatan-profit" />
            <ProfitActivityForm onSubmit={submit} useForm={form} submitTitle="Update" profitActivity={data} />
        </AppLayout>
    );
}
