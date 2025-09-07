import FormCard from '@/components/form/form-card';
import { InputSelect } from '@/components/form/input-select';
import InputText from '@/components/form/input-text';
import InputTextArea from '@/components/form/input-text-area';
import { toNullable } from '@/helpers/helper';
import { TCoa } from '@/types/coa';
import { TCreateProfitActivityCategory } from '@/types/profit-activity';
import { InertiaFormProps } from '@inertiajs/react';
import { FormEventHandler, PropsWithChildren } from 'react';

type Props = {
    onSubmit: FormEventHandler;
    useForm: InertiaFormProps<TCreateProfitActivityCategory>;
    submitTitle?: string;
    debit_accounts: TCoa[];
    credit_accounts: TCoa[];
};

export default function ProfitActivityCategoryForm({ onSubmit, useForm, submitTitle = 'Simpan', debit_accounts, credit_accounts }: Props) {
    const { data, setData, processing, errors } = useForm;

    return (
        <form onSubmit={onSubmit} className="space-y-5">
            <FormCard submitTitle={submitTitle} processing={processing}>
                <InputText
                    id="name"
                    label="Judul"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    errorMessage={errors.name}
                />
                <InputTextArea
                    id="description"
                    label="Deskripsi"
                    value={data.description ?? ''}
                    onChange={(e) => setData('description', toNullable(e.target.value))}
                    errorMessage={errors.description}
                />
                <div className="flex items-center justify-between gap-4">
                    <InputSelect
                        id="debit_coa_id"
                        data={debit_accounts}
                        label="Debit"
                        placeholder="Pilih Akun"
                        value={data.debit_coa_id}
                        onChange={(value) => setData('debit_coa_id', Number(value))}
                        labelKey="account_name"
                        wrapperClassName="grid gap-2 flex-1"
                        formDescription='Pemasukan masuk ke akun mana?'
                    />
                    <InputSelect
                        id="credit_coa_id"
                        data={credit_accounts}
                        label="Kredit"
                        placeholder="Pilih Akun"
                        value={data.credit_coa_id}
                        onChange={(value) => setData('credit_coa_id', Number(value))}
                        labelKey="account_name"
                        wrapperClassName="grid gap-2 flex-1"
                        formDescription='Sumber Pemasukan dari akun mana?'
                    />
                </div>
            </FormCard>
        </form>
    );
}
