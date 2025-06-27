import FormCard from '@/components/form/form-card';
import InputDateTime from '@/components/form/input-date-time';
import InputText from '@/components/form/input-text';
import InputTextArea from '@/components/form/input-text-area';
import { TCreateAnnouncement } from '@/types/announcement';
import { InertiaFormProps } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { SelectAnnouncementCategory } from './select-announcement-category';
import { SelectAnnouncementTargetScope } from './select-announcement-target-scope';

type Props = {
    onSubmit: FormEventHandler;
    useForm: InertiaFormProps<TCreateAnnouncement>;
    submitTitle?: string;
};

export default function AnnouncementForm({ onSubmit, useForm, submitTitle = 'Simpan' }: Props) {
    const { data, setData, processing, errors } = useForm;

    return (
        <form onSubmit={onSubmit} className="space-y-5">
            <FormCard submitTitle={submitTitle} processing={processing}>
                <SelectAnnouncementCategory label="Pilih Kategori" value={data.category} onChange={(value) => setData('category', value)} />
                <SelectAnnouncementTargetScope
                    label="Pilih Target Penerima"
                    value={data.target_scope}
                    onChange={(value) => setData('target_scope', value)}
                />
                <InputText
                    id="title"
                    label="Judul"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    errorMessage={errors.title}
                />
                <div className="grid gap-4 md:grid-cols-2">
                    <InputDateTime
                        id="start_at"
                        label="Waktu Mulai"
                        value={data.start_at}
                        onChange={(e) => setData('start_at', e.target.value)}
                        errorMessage={errors.start_at}
                    />
                    <InputDateTime
                        id="end_at"
                        label="Waktu Selesai"
                        value={data.end_at}
                        onChange={(e) => setData('end_at', e.target.value)}
                        errorMessage={errors.start_at}
                    />
                </div>
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
