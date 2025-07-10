import FormCard from '@/components/form/form-card';
import InputText from '@/components/form/input-text';
import InputTextArea from '@/components/form/input-text-area';
import { TCreateComplaint } from '@/types/complaint';
import { InertiaFormProps } from '@inertiajs/react';
import { FormEventHandler, PropsWithChildren } from 'react';
import { SelectComplaintCategory } from './select-complaint-category';

type Props = {
    onSubmit: FormEventHandler;
    useForm: InertiaFormProps<TCreateComplaint>;
    submitTitle?: string;
};

export default function ComplaintForm({ onSubmit, useForm, submitTitle = 'Simpan', children }: PropsWithChildren<Props>) {
    const { data, setData, processing, errors } = useForm;

    return (
        <form onSubmit={onSubmit} className="space-y-5">
            <FormCard submitTitle={submitTitle} processing={processing}>
                {children}
                <SelectComplaintCategory label="Pilih Kategori" value={data.category} onChange={(value) => setData('category', value)} />
                <InputText
                    id="title"
                    label="Judul"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    errorMessage={errors.title}
                />
                <InputTextArea
                    id="location"
                    label="Lokasi"
                    value={data.location}
                    onChange={(e) => setData('location', e.target.value)}
                    errorMessage={errors.location}
                />
                <InputTextArea
                    id="description"
                    label="Deskripsi"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    errorMessage={errors.description}
                />
            </FormCard>
        </form>
    );
}
