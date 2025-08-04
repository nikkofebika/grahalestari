import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';

type Province = {
    id: number;
    nama: string;
};

type Props = {
    value: number | null;
    onChange: (value: number) => void;
    id?: string;
    placeholder?: string;
};

export function SelectProvince({ value, onChange, id = 'province_id', placeholder = 'Pilih Provinsi' }: Props) {
    const [provinces, setProvinces] = useState<Province[]>([]);

    useEffect(() => {
        fetch(route('region.provinces'))
            .then((res) => res.json())
            .then((data) => setProvinces(data.data));
    }, []);

    return (
        <Select value={value !== null && value !== undefined ? value.toString() : ''} onValueChange={(val) => onChange(Number(val))} defaultValue="">
            <SelectTrigger id={id} className="mt-1 w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="max-h-72 overflow-y-auto">
                <SelectGroup>
                    {provinces.map((prov) => (
                        <SelectItem key={prov.id} value={prov.id.toString()}>
                            {prov.nama}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
