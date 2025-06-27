import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TCreateRole } from '@/types/role';
import { InertiaFormProps } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';
import { FormEventHandler } from 'react';

type Props = {
    permissions: [];
    onSubmit: FormEventHandler;
    useForm: InertiaFormProps<TCreateRole>;
    submitTitle?: string;
};

export default function RoleForm({ permissions, onSubmit, useForm, submitTitle = 'Simpan' }: Props) {
    const { data, setData, processing, errors } = useForm;

    const togglePermission = (permission: string) => {
        setData('permissions', (prev) => (prev.includes(permission) ? prev.filter((p) => p !== permission) : [...prev, permission]));
    };

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
            <div className="space-y-4">
                {Object.entries(permissions).map(([groupName, perms]) => (
                    <div key={groupName}>
                        <h4 className="mb-1 text-sm font-semibold text-gray-700 capitalize">{groupName.replace('_', ' ')}</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {perms.map((perm) => (
                                <label key={perm} className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={data.permissions.includes(perm)} onChange={() => togglePermission(perm)} />
                                    {perm}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
                <InputError message={errors.permissions} className="mt-1" />
            </div>
            <div className="flex items-center gap-4">
                <Button disabled={processing}>
                    <SaveIcon /> {submitTitle}
                </Button>
            </div>
        </form>
    );
}
