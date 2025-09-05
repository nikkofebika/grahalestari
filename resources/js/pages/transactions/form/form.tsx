import DatePicker from '@/components/form/date-picker';
import FormCard from '@/components/form/form-card';
import InputMultipleFiles from '@/components/form/input-multiple-files';
import { InputSelect } from '@/components/form/input-select';
import InputText from '@/components/form/input-text';
import InputTextArea from '@/components/form/input-text-area';
import { TCoa, TNormalBalance } from '@/types/coa';
import { TCreateJournal, TJournal } from '@/types/journal';
import { InertiaFormProps } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type Props = {
    normalBalance: TNormalBalance;
    onSubmit: FormEventHandler;
    useForm: InertiaFormProps<TCreateJournal>;
    debit_accounts: TCoa[];
    credit_accounts: TCoa[];
    submitTitle?: string;
    journal?: TJournal;
};

export default function JournalForm({
    normalBalance,
    onSubmit,
    useForm,
    debit_accounts,
    credit_accounts,
    submitTitle = 'Simpan',
    journal,
}: Props) {
    const { data, setData, processing, errors } = useForm;

    let debitFormDesciption = 'Pemasukan masuk ke akun mana?';
    let creditFormDescription = 'Sumber Pemasukan dari akun mana?';
    if (normalBalance === 'debit') {
        debitFormDesciption = 'Sumber Pengeluaran dari akun mana?';
        creditFormDescription = 'Pengeluaran keluar dari akun mana?';
    }

    return (
        <form onSubmit={onSubmit} className="space-y-5">
            <FormCard submitTitle={submitTitle} processing={processing}>
                <DatePicker
                    id="transaction_date"
                    label="Tanggal Transaction"
                    value={data.transaction_date ?? null}
                    onChange={(val) => setData('transaction_date', val ?? '')}
                    errorMessage={errors.transaction_date}
                />
                <InputText
                    id="amount"
                    label="Total Transaction"
                    value={data.amount}
                    onChange={(e) => setData('amount', Number(e.target.value))}
                    errorMessage={errors.amount}
                    props={{
                        type: 'number',
                        min: 0,
                    }}
                />
                <InputTextArea
                    id="description"
                    label="Deskripsi Transaction"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    errorMessage={errors.description}
                />
                <div className="flex items-center justify-between gap-4">
                    <InputSelect
                        id="debit_account_id"
                        data={debit_accounts}
                        label="Debit"
                        placeholder="Pilih Akun"
                        value={data.debit_account_id}
                        onChange={(value) => setData('debit_account_id', value)}
                        labelKey="account_name"
                        wrapperClassName="grid gap-2 flex-1"
                        formDescription={debitFormDesciption}
                    />
                    <InputSelect
                        id="credit_account_id"
                        data={credit_accounts}
                        label="Kredit"
                        placeholder="Pilih Akun"
                        value={data.credit_account_id}
                        onChange={(value) => setData('credit_account_id', value)}
                        labelKey="account_name"
                        wrapperClassName="grid gap-2 flex-1"
                        formDescription={creditFormDescription}
                    />
                </div>
                <InputMultipleFiles
                    id="files"
                    label="Upload File"
                    values={data.files} // file baru
                    onChange={(files) => setData('files', files)}
                    existingFiles={journal?.media} // dari backend
                    onDeleteExisting={(id) => {
                        setData('removed_file_ids', [...data.removed_file_ids, id]);
                    }}
                    errorMessage={errors.files}
                />
            </FormCard>
        </form>
    );
}
