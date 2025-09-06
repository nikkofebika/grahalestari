import { CommandSelectInfinite } from '@/components/form/command-select-infinite';
import DatePicker from '@/components/form/date-picker';
import FormCard from '@/components/form/form-card';
import InputMultipleFiles from '@/components/form/input-multiple-files';
import InputText from '@/components/form/input-text';
import InputError from '@/components/input-error';
import { TCreateCitizenFee, TCitizenFee } from '@/types/citizen-fee';
import { InertiaFormProps } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type Props = {
    onSubmit: FormEventHandler;
    useForm: InertiaFormProps<TCreateCitizenFee>;
    submitTitle?: string;
    citizenFee?: TCitizenFee;
};

export default function CitizenFeeForm({ onSubmit, useForm, submitTitle = 'Simpan', citizenFee }: Props) {
    const { data, setData, processing, errors } = useForm;

    return (
        <form onSubmit={onSubmit} className="space-y-5">
            <FormCard submitTitle={submitTitle} processing={processing}>
                <div className="grid gap-2">
                    <label className="text-sm font-medium">Pilih Kategori</label>
                    <CommandSelectInfinite<Pick<TCitizenFee, 'id' | 'name'>>
                        endpoint='/search-kategori-iuran-warga'
                        onChange={(value) => setData('citizen_fee_category_id', Number(value))}
                        value={data.citizen_fee_category_id}
                        initialSelectedItem={citizenFee?.category}
                    />
                    <InputError className="mt-1" message={errors.citizen_fee_category_id} />
                </div>
                <InputText
                    id="name"
                    label="Nama Kegiatan"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    errorMessage={errors.name}
                />
                <DatePicker
                    id='date'
                    label='Tanggal Kegiatan'
                    value={data.date}
                    onChange={(value) => setData('date', value ?? '')}
                    errorMessage={errors.date}
                    required={true}
                />
                <InputMultipleFiles
                    id="files"
                    label="Upload File"
                    values={data.files} // file baru
                    onChange={(files) => setData('files', files)}
                    existingFiles={citizenFee?.media} // dari backend
                    onDeleteExisting={(id) => {
                        setData('removed_file_ids', [...data.removed_file_ids, id]);
                    }}
                    errorMessage={errors.files}
                />
            </FormCard>
        </form>
    );
}
