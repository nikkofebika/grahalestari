import { CommandSelectInfinite } from '@/components/form/command-select-infinite';
import FormCard from '@/components/form/form-card';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toNullable } from '@/helpers/helper';
import { TCreateTenant, TTenant } from '@/types/tenant';
import { TUser } from '@/types/user';
import { InertiaFormProps } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type Props = {
    onSubmit: FormEventHandler;
    useForm: InertiaFormProps<TCreateTenant>;
    submitTitle?: string;
    tenant?: TTenant;
};

export default function TenantForm({ onSubmit, useForm, submitTitle = 'Simpan', tenant }: Props) {
    const { data, setData, processing, errors } = useForm;

    return (
        <form onSubmit={onSubmit} className="space-y-5">
            <FormCard submitTitle={submitTitle} processing={processing}>
                <div className="grid gap-2">
                    <label className="text-sm font-medium">Pilih RW</label>
                    <CommandSelectInfinite<Pick<TTenant, 'id' | 'name'>>
                        endpoint="/search-rw"
                        labelKey="name"
                        valueKey="id"
                        value={data.parent_id} // id dari form
                        onChange={(value) => setData('parent_id', Number(value))} // simpan ke form
                        initialSelectedItem={tenant?.parent ?? null} // object dari props edit
                    />
                    <InputError className="mt-1" message={errors.parent_id} />
                </div>
                <div className="grid gap-2">
                    <label className="text-sm font-medium">Pilih Ketua RT</label>
                    <CommandSelectInfinite<Pick<TUser, 'id' | 'name'>>
                        endpoint="/search-users"
                        labelKey="name"
                        valueKey="id"
                        value={data.leader_id} // id dari form
                        onChange={(value) => setData('leader_id', Number(value))} // simpan ke form
                        initialSelectedItem={tenant?.leader ?? null} // object dari props edit
                    />
                    <InputError className="mt-1" message={errors.leader_id} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Nama</Label>
                    <Input
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        autoComplete="name"
                        placeholder="Nama"
                    />
                    <InputError className="mt-1" message={errors.name} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="address">Alamat</Label>
                    <Input
                        id="address"
                        className="mt-1 block w-full"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        autoComplete="address"
                        placeholder="Alamat"
                    />
                    <InputError className="mt-1" message={errors.name} />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="latitude">Latitude</Label>
                        <Input
                            id="latitude"
                            className="mt-1 block w-full"
                            value={data.latitude ?? ''}
                            onChange={(e) => setData('latitude', toNullable(e.target.value))}
                            autoComplete="latitude"
                            placeholder="Latitude"
                        />
                        <InputError className="mt-1" message={errors.latitude} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="longitude">Longitude</Label>
                        <Input
                            id="longitude"
                            className="mt-1 block w-full"
                            value={data.longitude ?? ''}
                            onChange={(e) => setData('longitude', toNullable(e.target.value))}
                            autoComplete="longitude"
                            placeholder="Longitude"
                        />
                        <InputError className="mt-1" message={errors.longitude} />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Kode POS</Label>
                    <Input
                        id="postal_code"
                        className="mt-1 block w-full"
                        value={data.postal_code}
                        onChange={(e) => setData('postal_code', e.target.value)}
                        autoComplete="postal_code"
                        placeholder="Kode POS"
                    />
                    <InputError className="mt-1" message={errors.postal_code} />
                </div>
            </FormCard>
        </form>
    );
}
