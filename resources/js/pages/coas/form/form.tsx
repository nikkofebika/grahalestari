import { CommandSelectInfinite } from '@/components/form/command-select-infinite';
import FormCard from '@/components/form/form-card';
import InputText from '@/components/form/input-text';
import InputError from '@/components/input-error';
import { TCoa, TCreateCoa } from '@/types/coa';
import { TTenant } from '@/types/tenant';
import { InertiaFormProps } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { SelectParentAccount } from './select-parent-account';

type Props = {
    onSubmit: FormEventHandler;
    useForm: InertiaFormProps<TCreateCoa>;
    submitTitle?: string;
    coa?: TCoa;
    isUpdate?: boolean;
};

export default function CoaForm({ onSubmit, useForm, submitTitle = 'Simpan', coa, isUpdate = false }: Props) {
    const { data, setData, processing, errors } = useForm;

    return (
        <form onSubmit={onSubmit} className="space-y-5">
            <FormCard submitTitle={submitTitle} processing={processing}>
                {!isUpdate && (
                    <>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Pilih Owner</label>
                            <CommandSelectInfinite<Pick<TTenant, 'id' | 'name'>>
                                endpoint="/search-tenants"
                                labelKey="name"
                                valueKey="id"
                                value={data.tenant_id} // id dari form
                                onChange={(value) => setData('tenant_id', Number(value))} // simpan ke form
                                initialSelectedItem={coa?.tenant ?? null} // object dari props edit
                            />
                            <InputError className="mt-1" message={errors.tenant_id} />
                        </div>
                        <SelectParentAccount
                            label="Pilih Akun Induk"
                            value={data.parent_id}
                            onChange={(value) => setData('parent_id', value)}
                            errorMessage={errors.parent_id}
                        />
                    </>
                )}
                <InputText
                    id="account_name"
                    label="Nama Akun"
                    value={data.account_name}
                    onChange={(e) => setData('account_name', e.target.value)}
                    errorMessage={errors.account_name}
                />
                <InputText
                    id="account_number"
                    label="Nomor Akun"
                    value={data.account_number}
                    onChange={(e) => setData('account_number', e.target.value)}
                    errorMessage={errors.account_number}
                />
            </FormCard>
        </form>
    );
}
