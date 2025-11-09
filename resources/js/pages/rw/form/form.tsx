import { CommandSelectInfinite } from '@/components/form/command-select-infinite';
import FormCard from '@/components/form/form-card';
import InputText from '@/components/form/input-text';
import { SelectCity } from '@/components/form/select-city';
import { SelectDisctrict } from '@/components/form/select-district';
import { SelectProvince } from '@/components/form/select-province';
import { SelectVillage } from '@/components/form/select-village';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
                    <label className="text-sm font-medium">Pilih Ketua RW</label>
                    <CommandSelectInfinite<Pick<TUser, 'id' | 'name'>>
                        endpoint="/search-users"
                        labelKey="name"
                        valueKey="id"
                        value={data.leader_id} // id dari form
                        onChange={(value) => setData('leader_id', Number(value))} // simpan ke form
                        initialSelectedItem={tenant?.leader ?? null} // object dari props edit
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="province_id">Provinsi</Label>
                    <SelectProvince
                        value={data.province_id}
                        onChange={(value) => {
                            setData('province_id', value);
                            setData('city_id', null);
                            setData('district_id', null);
                            setData('village_id', null);
                        }}
                    />
                    <InputError message={errors.province_id} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="city_id">Kota</Label>
                    <SelectCity
                        provinceId={data.province_id}
                        value={data.city_id}
                        onChange={(value) => {
                            setData('city_id', value);
                            setData('district_id', null);
                            setData('village_id', null);
                        }}
                        disabled={!data.province_id}
                    />
                    <InputError message={errors.city_id} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="district_id">Kecamatan</Label>
                    <SelectDisctrict
                        cityId={data.city_id}
                        value={data.district_id}
                        onChange={(value) => {
                            setData('district_id', value);
                            setData('village_id', null);
                        }}
                        disabled={!data.city_id}
                    />
                    <InputError message={errors.district_id} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="village_id">Kelurahan</Label>
                    <SelectVillage
                        districtId={data.district_id}
                        value={data.village_id}
                        onChange={(value) => {
                            setData('village_id', value);
                        }}
                        disabled={!data.district_id}
                    />
                    <InputError message={errors.village_id} />
                </div>
                <InputText id="name" label="Nama Cluster/Perumahan/Wilayah" value={data.name} onChange={(e) => setData('name', e.target.value)} errorMessage={errors.name} />
                {/* <div className="grid gap-2">
                    <Label htmlFor="number">Nomor RW</Label>
                    <Input
                        id="number"
                        className="mt-1 block w-full"
                        value={data.number ?? ''}
                        onChange={(e) => setData('number', Number(e.target.value))}
                        autoComplete="number"
                        placeholder="Nomor RW"
                        type="number"
                        min={1}
                        max={255}
                    />
                    <InputError className="mt-1" message={errors.number} />
                </div> */}
                <InputText
                    id="number"
                    label="Nomor RW"
                    value={data.number ?? ''}
                    onChange={(e) => {
                        setData('number', e.target.value === '' ? null : Number(e.target.value));
                    }}
                    errorMessage={errors.number}
                    props={{
                        type: 'number',
                        min: 1,
                        max: 255,
                    }}
                />
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
                    <InputText
                        id="latitude"
                        label="Latitude"
                        value={data.latitude ?? ''}
                        onChange={(e) => setData('latitude', e.target.value)}
                        errorMessage={errors.latitude}
                    />
                    <InputText
                        id="longitude"
                        label="Longitude"
                        value={data.longitude ?? ''}
                        onChange={(e) => setData('longitude', e.target.value)}
                        errorMessage={errors.longitude}
                    />
                </div>
                <InputText
                    id="postal_code"
                    label="Kode POS"
                    value={data.postal_code ?? ''}
                    onChange={(e) => setData('postal_code', e.target.value)}
                    errorMessage={errors.postal_code}
                />
            </FormCard>
        </form>
    );
}
