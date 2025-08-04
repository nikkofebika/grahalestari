import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TCoa } from '@/types/coa';
import { useEffect, useState } from 'react';

type Props = {
    value?: number | null;
    onChange: (value: number) => void;
    id?: string;
    label?: string;
    placeholder?: string;
    wrapperClassName?: string;
    inputClassName?: string;
    errorMessage?: string;
};

export function SelectParentAccount({
    value,
    onChange,
    id = 'parent_id',
    label,
    placeholder,
    wrapperClassName = 'grid gap-2',
    inputClassName = 'mt-1 w-full',
    errorMessage,
}: Props) {
    const [coas, setCoas] = useState<TCoa[]>([]);
    useEffect(() => {
        fetch('/search-coas?filter[where_parent]=1')
            .then((res) => res.json())
            .then((data) => {
                const items = data.data ?? [];
                setCoas(items);
            });
    }, []);

    placeholder = placeholder ? placeholder : label;
    return (
        <div className={wrapperClassName}>
            {label && <Label htmlFor={id}>{label}</Label>}
            <Select value={String(value ?? '')} onValueChange={(value) => onChange(Number(value))}>
                <SelectTrigger id={id} className={inputClassName}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {coas.map((coa) => (
                            <SelectItem key={coa.id} value={String(coa.id)}>
                                {coa.account_name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {errorMessage && <InputError className="mt-1" message={errorMessage} />}
        </div>
    );
}
