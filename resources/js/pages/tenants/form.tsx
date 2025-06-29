import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TCreateTenant } from '@/types/tenant';
import { InertiaFormProps } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';
import { FormEventHandler } from 'react';

type Props = {
    onSubmit: FormEventHandler;
    useForm: InertiaFormProps<TCreateTenant>;
    submitTitle?: string;
};

export default function TenantForm({ onSubmit, useForm, submitTitle = 'Simpan' }: Props) {
    const { data, setData, processing, errors } = useForm;

    return (
        <form onSubmit={onSubmit} className="mt-5 space-y-6">
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
                        value={data.latitude}
                        onChange={(e) => setData('latitude', e.target.value)}
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
                        value={data.longitude}
                        onChange={(e) => setData('longitude', e.target.value)}
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
            <div className="flex items-center gap-4">
                <Button disabled={processing}>
                    <SaveIcon /> {submitTitle}
                </Button>
            </div>
        </form>
    );
}
