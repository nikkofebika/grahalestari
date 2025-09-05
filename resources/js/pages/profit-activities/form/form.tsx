import { CommandSelectInfinite } from '@/components/form/command-select-infinite';
import DatePicker from '@/components/form/date-picker';
import FormCard from '@/components/form/form-card';
import InputMultipleFiles from '@/components/form/input-multiple-files';
import InputText from '@/components/form/input-text';
import InputError from '@/components/input-error';
import { TCreateProfitActivity, TProfitActivity } from '@/types/profit-activity';
import { InertiaFormProps } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type Props = {
    onSubmit: FormEventHandler;
    useForm: InertiaFormProps<TCreateProfitActivity>;
    submitTitle?: string;
    profitActivity?: TProfitActivity;
};

export default function ProfitActivityForm({ onSubmit, useForm, submitTitle = 'Simpan', profitActivity }: Props) {
    const { data, setData, processing, errors } = useForm;

    return (
        <form onSubmit={onSubmit} className="space-y-5">
            <FormCard submitTitle={submitTitle} processing={processing}>
                <div className="grid gap-2">
                    <label className="text-sm font-medium">Pilih Kategori</label>
                    <CommandSelectInfinite<Pick<TProfitActivity, 'id' | 'name'>>
                        endpoint='/search-kategori-kegiatan-profit'
                        onChange={(value) => setData('profit_activity_category_id', Number(value))}
                        value={data.profit_activity_category_id}
                        initialSelectedItem={profitActivity?.category}
                    />
                    <InputError className="mt-1" message={errors.profit_activity_category_id} />
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
                <InputText
                    id="amount"
                    label="Jumlah Pendapatan"
                    value={data.amount}
                    onChange={(e) => setData('amount', Number(e.target.value))}
                    errorMessage={errors.amount}
                />
                <InputMultipleFiles
                    id="files"
                    label="Upload File"
                    values={data.files} // file baru
                    onChange={(files) => setData('files', files)}
                    existingFiles={profitActivity?.media} // dari backend
                    onDeleteExisting={(id) => {
                        setData('removed_file_ids', [...data.removed_file_ids, id]);
                    }}
                    errorMessage={errors.files}
                />
            </FormCard>
        </form>
    );
}
