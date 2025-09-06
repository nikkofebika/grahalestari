import CreateUpdatePageHeading from '@/components/headings/create-update-page-heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { TCreateCitizenFee, TCitizenFee } from '@/types/citizen-fee';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import CitizenFeeForm from '../form/form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Iuran Warga',
        href: '/iuran-warga',
    },
    {
        title: 'Update',
        href: '',
    },
];

type Props = {
    data: TCitizenFee;
};
export default function CitizenFeeEdit({ data }: Props) {
    const form = useForm<TCreateCitizenFee>({
        citizen_fee_category_id: data.citizen_fee_category_id,
        name: data.name,
        date: data.date,
        files: [],
        removed_file_ids: [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.put(route('iuran-warga.update', data), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CreateUpdatePageHeading title="Edit Iuran Warga" backUrl="/iuran-warga" />
            <CitizenFeeForm onSubmit={submit} useForm={form} submitTitle="Update" citizenFee={data} />
        </AppLayout>
    );
}
