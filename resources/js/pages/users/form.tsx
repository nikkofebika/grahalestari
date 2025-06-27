import { CommandSelectInfinite } from '@/components/form/command-select-infinite';
import DatePicker from '@/components/form/date-picker';
import FormCard from '@/components/form/form-card';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toNullable } from '@/helpers/helper';
import { TGroup } from '@/types/group';
import { TCreateUser, TUser } from '@/types/user';
import { InertiaFormProps } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';
import { FormEventHandler } from 'react';
import { SelectEducation } from './form/select-education';
import { SelectGender } from './form/select-gender';
import { SelectMaritalStatus } from './form/select-marital-status';
import { SelectReligion } from './form/select-religion';
import { SelectUserType } from './form/select-user-type';

type Props = {
    onSubmit: FormEventHandler;
    useForm: InertiaFormProps<TCreateUser>;
    submitTitle?: string;
    user?: TUser;
};

export default function UserForm({ onSubmit, useForm, submitTitle = 'Simpan', user }: Props) {
    const { data, setData, processing, errors } = useForm;

    return (
        <form onSubmit={onSubmit} className="space-y-5">
            <FormCard title="Data Akun" description="Data akun user">
                <div className="grid gap-2">
                    <label className="text-sm font-medium">Pilih Grup</label>
                    <CommandSelectInfinite<Pick<TGroup, 'id' | 'name'>>
                        endpoint="/get-groups"
                        labelKey="name"
                        valueKey="id"
                        placeholder="Pilih grup..."
                        value={data.group_id} // id dari form
                        onChange={(value) => setData('group_id', Number(value))} // simpan ke form
                        initialSelectedItem={user?.group ?? null} // object dari props edit
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        autoComplete="name"
                        placeholder="Nama Lengkap"
                    />
                    <InputError className="mt-1" message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        autoComplete="email"
                        placeholder="Email"
                    />
                    <InputError className="mt-1" message={errors.email} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">{submitTitle == 'Update' ? 'Ubah' : ''} Password</Label>
                    <Input
                        id="password"
                        type="password"
                        className="mt-1 block w-full"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value || undefined)}
                        autoComplete="password"
                        placeholder="Password"
                    />

                    <InputError message={errors.password} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="type">Tipe User</Label>
                    <SelectUserType value={data.type} onChange={(value) => setData('type', value)} placeholder="Pilih Tipe User" />
                    <InputError message={errors.type} />
                </div>
            </FormCard>
            <FormCard title="Data Detail" description="Data detail user">
                <div className="grid gap-2">
                    <Label htmlFor="no_kk">Nomor KK</Label>
                    <Input
                        id="no_kk"
                        className="mt-1 block w-full"
                        value={data.no_kk ?? ''}
                        onChange={(e) => setData('no_kk', toNullable(e.target.value))}
                        autoComplete="no_kk"
                        placeholder="Nomor KK"
                    />
                    <InputError className="mt-1" message={errors.no_kk} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="no_ktp">Nomor KTP</Label>
                    <Input
                        id="no_ktp"
                        className="mt-1 block w-full"
                        value={data.no_ktp ?? ''}
                        onChange={(e) => setData('no_ktp', toNullable(e.target.value))}
                        autoComplete="no_ktp"
                        placeholder="Nomor KTP"
                    />
                    <InputError className="mt-1" message={errors.no_ktp} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input
                        id="phone"
                        className="mt-1 block w-full"
                        value={data.phone ?? ''}
                        onChange={(e) => setData('phone', toNullable(e.target.value))}
                        autoComplete="phone"
                        placeholder="Nomor Telepon"
                    />
                    <InputError className="mt-1" message={errors.phone} />
                </div>

                <DatePicker id="birth_date" label="Tanggal Lahir" value={data.birth_date ?? null} onChange={(val) => setData('birth_date', val)} />
                <div className="grid gap-2">
                    <Label htmlFor="birth_place">Tempat Lahir</Label>

                    <Input
                        id="birth_place"
                        className="mt-1 block w-full"
                        value={data.birth_place ?? ''}
                        onChange={(e) => setData('birth_place', toNullable(e.target.value))}
                        autoComplete="birth_place"
                        placeholder="Tempat Lahir"
                    />

                    <InputError message={errors.birth_place} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="gender">Jenis Kelamin</Label>
                    <SelectGender value={data.gender ?? ''} onChange={(value) => setData('gender', value)} />
                    <InputError message={errors.gender} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="religion">Agama</Label>
                    <SelectReligion value={data.religion ?? ''} onChange={(value) => setData('religion', value)} />
                    <InputError message={errors.religion} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="marital_status">Status Pernikahan</Label>
                    <SelectMaritalStatus value={data.marital_status ?? ''} onChange={(value) => setData('marital_status', value)} />
                    <InputError message={errors.marital_status} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="education">Jenjang Pendidikan</Label>
                    <SelectEducation value={data.education ?? ''} onChange={(value) => setData('education', value)} />
                    <InputError message={errors.education} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="job">Pekerjaan</Label>
                    <Input
                        id="job"
                        className="mt-1 block w-full"
                        value={data.job ?? ''}
                        onChange={(e) => setData('job', e.target.value)}
                        autoComplete="job"
                        placeholder="Nomor Telepon"
                    />
                    <InputError className="mt-1" message={errors.job} />
                </div>

                <div className="col-span-2 grid gap-2">
                    <Label htmlFor="address">Alamat</Label>
                    <Textarea
                        id="address"
                        className="mt-1 block w-full"
                        value={data.address ?? ''}
                        onChange={(e) => setData('address', e.target.value)}
                        autoComplete="address"
                        placeholder="Alamat Lengkap"
                    />
                    <InputError className="mt-1" message={errors.address} />
                </div>
            </FormCard>

            <div className="flex items-center gap-4">
                <Button disabled={processing}>
                    <SaveIcon /> {submitTitle}
                </Button>
            </div>
        </form>
    );
}
