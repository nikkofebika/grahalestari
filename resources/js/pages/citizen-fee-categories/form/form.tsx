import FormCard from '@/components/form/form-card';
import { InputSelect } from '@/components/form/input-select';
import InputText from '@/components/form/input-text';
import InputTextArea from '@/components/form/input-text-area';
import { toNullable } from '@/helpers/helper';
import { TCoa } from '@/types/coa';
import { TCreateCitizenFeeCategory } from '@/types/citizen-fee';
import { InertiaFormProps } from '@inertiajs/react';
import { FormEventHandler, PropsWithChildren, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type Props = {
    onSubmit: FormEventHandler;
    useForm: InertiaFormProps<TCreateCitizenFeeCategory>;
    submitTitle?: string;
    debit_accounts: TCoa[];
    credit_accounts: TCoa[];
};

export default function CitizenFeeCategoryForm({ onSubmit, useForm, submitTitle = 'Simpan', debit_accounts, credit_accounts }: Props) {
    const { data, setData, processing, errors } = useForm;

    const [isFixAmount, setIsFixAmount] = useState<boolean>(data.fix_amount > 0);

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
                <div className="flex items-center gap-3">
                    <Checkbox id="is_fix_amount" onCheckedChange={(value) => {
                        setIsFixAmount(Boolean(value));
                        setData('fix_amount', 0);
                    }} checked={isFixAmount} />
                    <Label htmlFor="is_fix_amount">Tentukan Jumlah Iuran?</Label>
                </div>
                {isFixAmount && (
                    <InputText
                        id="fix_amount"
                        label="Jumlah Iuran Yang Ditentukan"
                        value={data.fix_amount}
                        onChange={(e) => setData('fix_amount', Number(e.target.value))}
                        errorMessage={errors.fix_amount}
                        props={{
                            type: 'number',
                            min: 1,
                        }}
                    />
                )}
                <div className="flex items-center justify-between gap-4">
                    <InputSelect
                        id="debit_coa_id"
                        data={debit_accounts}
                        label="Debit"
                        placeholder="Pilih Akun"
                        value={data.debit_coa_id}
                        onChange={(value) => setData('debit_coa_id', value)}
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
                        onChange={(value) => setData('credit_coa_id', value)}
                        labelKey="account_name"
                        wrapperClassName="grid gap-2 flex-1"
                        formDescription='Sumber Pemasukan dari akun mana?'
                    />
                </div>
            </FormCard>
        </form>
    );
}
